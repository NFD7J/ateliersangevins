import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contact } from "@/lib/site-data";

// Route appelée par le Cron Vercel (voir vercel.json). Envoie par email le
// trafic de la semaine (visiteurs + pages vues) via la Web Analytics API.
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

type Traffic = { pageviews: number; visitors: number };

// Total (dédupliqué) des 7 derniers jours via l'endpoint count de Vercel.
// Renvoie null si non configuré (token/projectId absents) ou en cas d'erreur.
async function getTraffic(since: string, until: string): Promise<Traffic | null> {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;

  const params = new URLSearchParams({ projectId, since, until });
  if (process.env.VERCEL_TEAM_ID) params.set("teamId", process.env.VERCEL_TEAM_ID);

  try {
    const res = await fetch(
      `https://api.vercel.com/v1/query/web-analytics/visits/count?${params}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return {
      pageviews: json.data?.pageviews ?? 0,
      visitors: json.data?.visitors ?? 0,
    };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  // Sécurité : seul Vercel (avec CRON_SECRET) peut déclencher cette route.
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const isoDay = (d: Date) => d.toISOString().slice(0, 10); // YYYY-MM-DD

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const traffic = await getTraffic(isoDay(weekAgo), isoDay(now));

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1f2a24;line-height:1.6;max-width:480px;">
      <h2 style="color:#2f5a45;">📊 Trafic de la semaine — Les Ateliers Angevins</h2>
      <p style="color:#4b5a53;">Du ${fmtDate(weekAgo)} au ${fmtDate(now)}.</p>
      ${
        traffic
          ? `<table style="width:100%;border-collapse:collapse;margin-top:12px;">
               <tr>
                 <td style="padding:10px 0;border-bottom:1px solid #e5eae7;color:#4b5a53;">Visiteurs</td>
                 <td style="padding:10px 0;border-bottom:1px solid #e5eae7;text-align:right;font-weight:700;font-size:18px;color:#1f2a24;">${traffic.visitors}</td>
               </tr>
               <tr>
                 <td style="padding:10px 0;color:#4b5a53;">Pages vues</td>
                 <td style="padding:10px 0;text-align:right;font-weight:700;font-size:18px;color:#1f2a24;">${traffic.pageviews}</td>
               </tr>
             </table>`
          : `<p style="color:#9aa39d;">Trafic indisponible (Vercel Analytics non configuré).</p>`
      }
    </div>
  `;

  const { error } = await resend.emails.send({
    from: "Ateliers Angevins <onboarding@resend.dev>",
    to: [...contact.emails],
    subject: `Trafic de la semaine — ${fmtDate(now)}`,
    html,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

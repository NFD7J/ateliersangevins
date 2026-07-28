"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactEmail, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { ok: false };

const inputClass =
  "mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactEmail,
    initialState
  );

  // Horodatage posé à l'affichage du formulaire, dans un effet plutôt qu'au
  // rendu : le serveur ne doit pas produire cette valeur, sinon elle mesurerait
  // l'âge de la page rendue et non le temps de saisie réel.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  function submit(formData: FormData) {
    if (mountedAt.current) {
      formData.set("elapsed", String(Date.now() - mountedAt.current));
    }
    formAction(formData);
  }

  if (state.ok) {
    return (
      <div className="rounded-lg bg-forest-50 p-4 text-sm text-forest-800">
        Merci, votre message a bien été envoyé. Nous vous répondrons dès que
        possible.
      </div>
    );
  }

  return (
    <form action={submit} className="space-y-4">
      {/* Champ leurre. `absolute` le sort du flux (aucun espace ajouté),
          `aria-hidden` + `tabIndex={-1}` le masquent aux lecteurs d'écran et à
          la navigation clavier. Un humain ne peut donc pas le remplir par
          erreur — ne pas le remplacer par `type="hidden"`, que les robots
          savent ignorer. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Nom
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink">
            Téléphone (optionnel)
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
        />
      </div>

      {state.error && (
        <p className="text-sm font-medium text-terracotta-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-forest-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700 disabled:opacity-60"
      >
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
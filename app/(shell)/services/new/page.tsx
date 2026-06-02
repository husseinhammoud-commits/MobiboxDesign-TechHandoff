/**
 * Create-Service Wizard — `/services/new`
 *
 * Owns:
 *   - which step is active
 *   - the consolidated draft state (steps 1-4)
 *   - the offer-theme takeover state (which offer is being themed, if any)
 *
 * Renders WizardShell + the active step. When the user clicks the 3-dot
 * "Edit theme" action on an offer card, Step 3 hands the request up; the
 * page swaps in the OfferThemeEditor in place of Step 3's content until
 * the user confirms "Done".
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { WizardShell } from '@/tech-handoff/components';
import {
  Step1Service, Step2Setup, Step3Offers, Step4Portals, Step5Review, OfferThemeEditor,
  THEME_DEFAULTS,
  type Step1Values, type Step2Values, type Step4Values, type OfferDraft,
  type ThemeState, type ThemeElementId,
} from '@/tech-handoff/components/wizard';

const STEPPER = [
  { label: 'Service' },
  { label: 'Set up'  },
  { label: 'Offers'  },
  { label: 'Portals' },
  { label: 'Review'  },
];

export default function NewServiceWizardPage() {
  const router = useRouter();

  // Step state
  const [step, setStep] = useState(0);

  // Form state — each step's values live here so they survive step nav
  const [step1, setStep1] = useState<Step1Values>({ name: '', client: '', category: '', premium: false });
  const [step2, setStep2] = useState<Step2Values>({ countries: ['UAE', 'KSA'], defaultLang: 'English', channelType: 'Direct carrier billing (DCB)', customThemes: false, heEnabled: false });
  const [offers, setOffers] = useState<OfferDraft[]>([]);
  const [step4, setStep4] = useState<Step4Values>({ country: '', operator: '', premiumEnabled: false, premiumUrl: '', freemiumEnabled: false, freemiumUrl: '', parameters: [{ name: '', value: '' }] });

  // Offer-theme takeover
  const [themingOfferId, setThemingOfferId] = useState<string | null>(null);
  const [themeState, setThemeState]         = useState<ThemeState>(THEME_DEFAULTS);
  const [themeChannel]                      = useState<'otp' | 'voice'>('otp');
  const [selectedThemeEl, setSelectedThemeEl] = useState<ThemeElementId | null>(null);

  const updateThemeProp = (ch: 'otp' | 'voice', id: ThemeElementId, patch: Record<string, unknown>) =>
    setThemeState((prev) => {
      const channel = prev[ch] as unknown as Record<string, Record<string, unknown>>;
      return { ...prev, [ch]: { ...prev[ch], [id]: { ...channel[id], ...patch } } };
    });

  // Helpers ----------------------------------------------------------------
  const update1 = <K extends keyof Step1Values>(k: K, v: Step1Values[K]) => setStep1((s) => ({ ...s, [k]: v }));
  const update2 = <K extends keyof Step2Values>(k: K, v: Step2Values[K]) => setStep2((s) => ({ ...s, [k]: v }));
  const update4 = <K extends keyof Step4Values>(k: K, v: Step4Values[K]) => setStep4((s) => ({ ...s, [k]: v }));

  const addOffer    = (o: OfferDraft) => setOffers((prev) => [...prev, o]);
  const updateOffer = (id: string, patch: Partial<OfferDraft>) =>
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  const removeOffer = (id: string) => setOffers((prev) => prev.filter((o) => o.id !== id));

  const themingOffer = offers.find((o) => o.id === themingOfferId);

  const onLaunch = () => {
    // Real impl: POST to backend, then route to the new service detail.
    // For the POC: log the draft and return to the services list.
    console.log('Launching service:', { step1, step2, offers, step4 });
    router.push('/services');
  };

  const onSaveDraft = () => {
    console.log('Saving draft:', { step1, step2, offers, step4 });
    router.push('/services');
  };

  // Render the active step (or the offer-theme takeover) -------------------
  const renderActive = () => {
    // Offer-theme takeover replaces Step 3 content when active
    if (step === 2 && themingOffer) {
      return (
        <OfferThemeEditor
          offerLabel={`Offer-${offers.findIndex((o) => o.id === themingOffer.id) + 1}`}
          channel={themeChannel}
          themeState={themeState}
          selectedEl={selectedThemeEl}
          onSelectEl={setSelectedThemeEl}
          onUpdateTheme={updateThemeProp}
          onDone={() => { updateOffer(themingOffer.id, { themed: true }); setThemingOfferId(null); setSelectedThemeEl(null); }}
          onCancel={() => { setThemingOfferId(null); setSelectedThemeEl(null); }}
        />
      );
    }

    switch (step) {
      case 0: return <Step1Service values={step1} onChange={update1} />;
      case 1: return <Step2Setup   values={step2} onChange={update2} />;
      case 2: return (
        <Step3Offers
          countries={step2.countries}
          offers={offers}
          onAddOffer={addOffer}
          onUpdateOffer={updateOffer}
          onRemoveOffer={removeOffer}
          onEditTheme={(id) => setThemingOfferId(id)}
        />
      );
      case 3: return <Step4Portals values={step4} onChange={update4} />;
      case 4: return <Step5Review  step1={step1} step2={step2} offers={offers} step4={step4} onJumpTo={setStep} />;
      default: return null;
    }
  };

  const isLast = step === STEPPER.length - 1;

  return (
    <WizardShell
      title="Create new service"
      stepperItems={STEPPER}
      currentStep={step}
      onJumpStep={(i) => i <= step && setStep(i)}                /* allow jumping BACK to earlier steps */
      onBack={() => setStep((s) => Math.max(0, s - 1))}
      onContinue={isLast ? onLaunch : () => setStep((s) => Math.min(STEPPER.length - 1, s + 1))}
      onSaveDraft={onSaveDraft}
      onExit={() => router.push('/services')}
      continueLabel={isLast ? 'Launch service' : 'Continue'}
    >
      {renderActive()}
    </WizardShell>
  );
}

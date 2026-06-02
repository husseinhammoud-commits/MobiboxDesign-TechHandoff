'use client';

import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import Typography from '@mui/material/Typography';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

import { Drawer, Button, Chip, Stepper } from './';
import {
  Step1Service, Step2Setup, Step3Offers, Step4Portals, Step5Review, OfferThemeEditor, ThemeEditorPanel,
  THEME_DEFAULTS,
  type Step1Values, type Step2Values, type Step4Values, type OfferDraft,
  type ThemeState, type ThemeElementId,
} from './wizard';

const STEPPER_ITEMS = [
  { label: 'Service' },
  { label: 'Set up'  },
  { label: 'Offers'  },
  { label: 'Portals' },
  { label: 'Review'  },
];

export interface ServiceWizardDrawerProps {
  open:    boolean;
  onClose: () => void;
}

export function ServiceWizardDrawer({ open, onClose }: ServiceWizardDrawerProps) {
  const [step, setStep] = useState(0);

  const [step1, setStep1] = useState<Step1Values>({ name: '', client: '', category: '', premium: false });
  const [step2, setStep2] = useState<Step2Values>({
    countries: ['United Arab Emirates', 'Saudi Arabia'], defaultLang: 'English',
    channelType: 'Double opt-in (MO/MT)', customThemes: false,
  });
  const [offers, setOffers]       = useState<OfferDraft[]>([]);
  const [step4, setStep4]         = useState<Step4Values>({ country: '', operator: '', premium: false, url: '', parameters: [{ name: '', value: '' }] });
  const [themingOfferId, setThemingOfferId] = useState<string | null>(null);
  const [themeEditorOpen, setThemeEditorOpen] = useState(false);
  const [themeChannel, setThemeChannel]       = useState<'otp' | 'voice'>('otp');
  const [themeState, setThemeState]           = useState<ThemeState>(THEME_DEFAULTS);
  const [selectedThemeEl, setSelectedThemeEl] = useState<ThemeElementId | null>(null);

  // Mount the theme panel only after the wizard open animation (350ms) to avoid
  // a brief flash of the panel while the drawer is still sliding in.
  const stepTopRef = useRef<HTMLDivElement>(null);

  // Scroll drawer body back to top whenever the step changes
  useEffect(() => {
    stepTopRef.current?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
  }, [step]);

  const [panelMounted, setPanelMounted] = useState(false);
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setPanelMounted(true), 400);
      return () => clearTimeout(t);
    } else {
      setPanelMounted(false);
    }
  }, [open]);

  const update1 = <K extends keyof Step1Values>(k: K, v: Step1Values[K]) => setStep1((s) => ({ ...s, [k]: v }));
  const update2 = <K extends keyof Step2Values>(k: K, v: Step2Values[K]) => setStep2((s) => ({ ...s, [k]: v }));
  const update4 = <K extends keyof Step4Values>(k: K, v: Step4Values[K]) => setStep4((s) => ({ ...s, [k]: v }));

  const updateThemeProp = (ch: 'otp' | 'voice', id: ThemeElementId, patch: Record<string, unknown>) =>
    setThemeState((prev) => {
      const channel = prev[ch] as unknown as Record<string, Record<string, unknown>>;
      return { ...prev, [ch]: { ...prev[ch], [id]: { ...channel[id], ...patch } } };
    });

  const addOffer    = (o: OfferDraft) => setOffers((prev) => [...prev, o]);
  const updateOffer = (id: string, patch: Partial<OfferDraft>) =>
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  const removeOffer = (id: string) => setOffers((prev) => prev.filter((o) => o.id !== id));

  const themingOffer = offers.find((o) => o.id === themingOfferId);

  const resetState = () => {
    setStep(0);
    setStep1({ name: '', client: '', category: '', premium: false });
    setStep2({ countries: ['United Arab Emirates', 'Saudi Arabia'], defaultLang: 'English', channelType: 'Double opt-in (MO/MT)', customThemes: false });
    setOffers([]);
    setThemingOfferId(null);
    setThemeEditorOpen(false);
    setThemeChannel('otp');
    setThemeState(THEME_DEFAULTS);
    setSelectedThemeEl(null);
  };

  const handleExit = () => {
    setThemeEditorOpen(false);
    onClose();
    setTimeout(resetState, 350);
  };

  const handleSetStep = (s: number) => {
    if (s !== 1) setThemeEditorOpen(false);
    setStep(s);
  };

  const handleLaunch = () => {
    console.log('Launching service:', { step1, step2, offers, step4 });
    handleExit();
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', { step1, step2, offers, step4 });
    handleExit();
  };

  const renderStep = () => {
    if (step === 2 && themingOffer) {
      return (
        <OfferThemeEditor
          offerLabel={`Offer-${offers.findIndex((o) => o.id === themingOffer.id) + 1}`}
          channel={themeChannel}
          themeState={themeState}
          selectedEl={selectedThemeEl}
          onSelectEl={setSelectedThemeEl}
          onUpdateTheme={updateThemeProp}
          onDone={() => {
            updateOffer(themingOffer.id, { themed: true });
            setThemingOfferId(null);
            setThemeEditorOpen(false);
            setSelectedThemeEl(null);
          }}
          onCancel={() => {
            setThemingOfferId(null);
            setThemeEditorOpen(false);
            setSelectedThemeEl(null);
          }}
        />
      );
    }
    switch (step) {
      case 0: return <Step1Service values={step1} onChange={update1} />;
      case 1: return (
        <Step2Setup
          values={step2} onChange={update2}
          themeEditorOpen={themeEditorOpen}
          themeChannel={themeChannel}
          onThemeEditorChange={(v) => setThemeEditorOpen(v)}
          themeState={themeState}
          selectedThemeEl={selectedThemeEl}
          onSelectThemeEl={setSelectedThemeEl}
          onUpdateTheme={updateThemeProp}
        />
      );
      case 2: return (
        <Step3Offers
          countries={step2.countries}
          offers={offers}
          onAddOffer={addOffer}
          onUpdateOffer={updateOffer}
          onRemoveOffer={removeOffer}
          onEditTheme={(id) => { setThemingOfferId(id); setThemeEditorOpen(true); }}
        />
      );
      case 3: return <Step4Portals values={step4} onChange={update4} />;
      case 4: return <Step5Review  step1={step1} step2={step2} offers={offers} step4={step4} onJumpTo={setStep} />;
      default: return null;
    }
  };

  const isFirst = step === 0;
  const isLast  = step === STEPPER_ITEMS.length - 1;

  return (
    <>
      {/* Custom backdrop — rendered once when wizard opens, stays stable for
          the entire session so it never flickers during tab/step navigation.
          Click fires handleExit (same as clicking outside in a normal modal).
          z=1198 keeps it below the theme panel (1199) and the drawer (1200). */}
      {/* Portal ensures backdrop and panel render at document.body level,
          same stacking context as MUI Drawer's portal. Without this, any
          ancestor that creates a stacking context would trap z-index values
          and make the panel non-interactive. */}
      <Portal>
        {open && (
          <Box
            onClick={handleExit}
            sx={{
              position: 'fixed', inset: 0, zIndex: 1198,
              backgroundColor: 'rgba(15, 23, 42, 0.45)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />
        )}
      </Portal>

      {/* Theme panel — mounted after wizard open animation to avoid flash */}
      <Portal>
        {panelMounted && (
          <ThemeEditorPanel
            open={themeEditorOpen}
            channel={themeChannel}
            themeState={themeState}
            selectedEl={selectedThemeEl}
            onChannelChange={setThemeChannel}
            onSelectEl={setSelectedThemeEl}
            onClose={() => setThemeEditorOpen(false)}
          />
        )}
      </Portal>

      {/* hideBackdrop always — our custom backdrop above handles everything */}
      <Drawer open={open} onClose={handleExit} size="lg" hideBackdrop>
        {/* Sticky wizard header */}
        <Box sx={{
          flexShrink: 0,
          position: 'sticky', top: 0, zIndex: 10,
          backgroundColor: 'surface.main',
          borderBottom: (t) => `1px solid ${t.palette.border.main}`,
          px: 4, pt: 2.5, pb: 2,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography component="h1" sx={{ fontSize: 18, fontWeight: 600 }}>Create new service</Typography>
                <Chip label="Draft" variant="soft" />
              </Box>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.5 }}>
                5-step setup. Your progress is saved automatically.
              </Typography>
            </Box>
            <Button variant="secondary" leftIcon={<X size={14} />} onClick={handleExit}>Exit</Button>
          </Box>
          <Box sx={{ mt: 2.5 }}>
            <Stepper items={STEPPER_ITEMS} current={step} onJump={handleSetStep} />
          </Box>
        </Box>

        {/* Scrollable step content */}
        <Drawer.Body padded={false}>
          <Box sx={{ px: 4, py: 4 }}>
            <div ref={stepTopRef} />
            {renderStep()}
          </Box>
        </Drawer.Body>

        {/* Sticky footer */}
        <Drawer.Footer sx={{ justifyContent: 'space-between' }}>
          <Button
            variant="ghost"
            disabled={isFirst}
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => handleSetStep(Math.max(0, step - 1))}
          >
            Back
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="secondary" onClick={handleSaveDraft}>Save draft &amp; exit</Button>
            <Button
              variant="primary"
              rightIcon={!isLast ? <ArrowRight size={16} /> : undefined}
              onClick={isLast ? handleLaunch : () => handleSetStep(Math.min(STEPPER_ITEMS.length - 1, step + 1))}
            >
              {isLast ? 'Launch service' : 'Continue'}
            </Button>
          </Box>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}

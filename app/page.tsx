/**
 * Root route — redirects to /dashboard (the app's true landing page).
 *
 * `next/navigation`'s `redirect()` is a server-side redirect at render time;
 * no client-side flash.
 */

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/dashboard');
}

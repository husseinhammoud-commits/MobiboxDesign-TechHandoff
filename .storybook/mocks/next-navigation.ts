// Mock for next/navigation used in Storybook (Sidebar uses usePathname)
export const usePathname = () => '/dashboard';
export const useRouter   = () => ({ push: () => {}, replace: () => {}, prefetch: () => {} });
export const useParams   = () => ({});
export const useSearchParams = () => new URLSearchParams();

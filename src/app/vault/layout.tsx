import { VaultProvider } from "@/components/vault/VaultContext";

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <VaultProvider>
      {children}
    </VaultProvider>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tenant } from './types';
import { INITIAL_TENANTS } from './mock-data';

interface TenantContextType {
  currentTenant: Tenant;
  tenants: Tenant[];
  switchTenant: (tenantId: string) => void;
  updateTenantColor: (primaryColor: string, accentColor?: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [currentTenant, setCurrentTenant] = useState<Tenant>(INITIAL_TENANTS[0]);

  // Apply CSS custom properties when tenant changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--brand-primary', currentTenant.primaryColor);
      root.style.setProperty('--brand-primary-hover', currentTenant.primaryHover);
      root.style.setProperty('--brand-accent', currentTenant.accentColor);
    }
  }, [currentTenant]);

  const switchTenant = (tenantId: string) => {
    const found = tenants.find((t) => t.id === tenantId);
    if (found) {
      setCurrentTenant(found);
    }
  };

  const updateTenantColor = (primaryColor: string, accentColor?: string) => {
    const updated = {
      ...currentTenant,
      primaryColor,
      accentColor: accentColor || currentTenant.accentColor
    };
    setCurrentTenant(updated);
    setTenants((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        tenants,
        switchTenant,
        updateTenantColor
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}

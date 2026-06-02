/**
 * Barrel export. Always import from here — never from individual files.
 */

// ---------- PRIMITIVES ----------
export { Button }      from './Button';     export type { ButtonProps }      from './Button';
export { IconButton }  from './IconButton'; export type { IconButtonProps }  from './IconButton';
export { Card }        from './Card';       export type { CardProps }        from './Card';
export { Chip }        from './Chip';       export type { ChipProps }        from './Chip';
export { StatusPill }  from './StatusPill'; export type { StatusPillProps, Status } from './StatusPill';
export { StatTile }    from './StatTile';   export type { StatTileProps }    from './StatTile';
export { Input }       from './Input';      export type { InputProps }       from './Input';
export { Select }      from './Select';     export type { SelectProps }      from './Select';
export { Switch }      from './Switch';     export type { SwitchProps }      from './Switch';
export { Dialog }      from './Dialog';     export type { DialogProps }      from './Dialog';
export { Drawer }      from './Drawer';     export type { DrawerProps }      from './Drawer';
export { Tabs }        from './Tabs';       export type { TabsProps, TabItem } from './Tabs';
export { Menu, useMenu } from './Menu';     export type { MenuProps, MenuItemProps } from './Menu';
export { Avatar }      from './Avatar';     export type { AvatarProps }      from './Avatar';
export { Skeleton }    from './Skeleton';   export type { SkeletonProps }    from './Skeleton';
export { Banner }      from './Banner';     export type { BannerProps }      from './Banner';
export { ProgressBar } from './ProgressBar';export type { ProgressBarProps } from './ProgressBar';
export { BarChart }    from './BarChart';   export type { BarChartProps, BarChartDatum } from './BarChart';
export { Stepper }     from './Stepper';    export type { StepperProps, StepperItem }    from './Stepper';
export { WizardShell } from './WizardShell';export type { WizardShellProps } from './WizardShell';

// ---------- APP-SHELL COMPOSITES ----------
export { Sidebar }     from './Sidebar';     export type { SidebarProps, SidebarItem } from './Sidebar';
export { PageHeader }  from './PageHeader';  export type { PageHeaderProps } from './PageHeader';

// ---------- SCREEN-LEVEL COMPOSITES ----------
export { ServiceCard }         from './ServiceCard';         export type { ServiceCardProps } from './ServiceCard';
export { ServiceGrid }         from './ServiceGrid';         export type { ServiceGridProps } from './ServiceGrid';
export { ServiceDetailDrawer } from './ServiceDetailDrawer'; export type { ServiceDetailDrawerProps } from './ServiceDetailDrawer';
export { ServiceWizardDrawer } from './ServiceWizardDrawer'; export type { ServiceWizardDrawerProps } from './ServiceWizardDrawer';

// ---------- DASHBOARD COMPOSITES ----------
export { DashboardSection }    from './DashboardSection';    export type { DashboardSectionProps } from './DashboardSection';
export { DashboardPayouts }    from './DashboardPayouts';
export { DashboardCAPs }       from './DashboardCAPs';
export { DashboardCountryOps } from './DashboardCountryOps';

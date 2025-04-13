import * as React from "react";

const TabsContext = React.createContext();

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }) {
  return (
    <div className="inline-flex rounded-md bg-muted p-1 text-muted-foreground">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = value === activeTab;

  return (
    <button
      className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all ${
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "hover:text-foreground hover:bg-accent"
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { activeTab } = React.useContext(TabsContext);
  return value === activeTab ? <div className="mt-2">{children}</div> : null;
}

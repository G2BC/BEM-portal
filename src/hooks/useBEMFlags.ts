import { useEffect, useState } from "react";

const FlagsLoaders = import.meta.glob<{ default: string }>("../assets/flags/bem/*.png");

export function useBEMFlags(type: string | null) {
  const [iconUrl, setIconUrl] = useState<string>("");

  useEffect(() => {
    if (!type) {
      setIconUrl("");
      return;
    }

    const iconPath = `../assets/flags/bem/${type.toUpperCase()}.png`;
    const loadIcon = FlagsLoaders[iconPath];
    let isMounted = true;

    if (!loadIcon) {
      setIconUrl("");
      return;
    }

    loadIcon().then((module) => {
      if (isMounted) setIconUrl(module.default);
    });

    return () => {
      isMounted = false;
    };
  }, [type]);

  return iconUrl;
}

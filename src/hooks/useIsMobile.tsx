import * as React from 'react';

const MOBILE_BREAKPOINT = 969; // px
const INCH_43_BREAKPOINT = 2240; // example px width for 43", adjust to your spec

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // initial check
    setIsMobile(mql.matches);

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

export function useIs43Inches() {
  const [is43Inches, setIs43Inches] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${INCH_43_BREAKPOINT}px)`);

    const onChange = (e: MediaQueryListEvent) => {
      setIs43Inches(e.matches);
    };

    // initial check
    setIs43Inches(mql.matches);

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return is43Inches;
}

//--- Global
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useExperienceEditor = () => {
  const context = useSitecoreContext();
  if (!context?.sitecoreContext) {
    return false;
  }
  return context?.sitecoreContext.pageEditing ? context.sitecoreContext.pageEditing : false;
};

export default useExperienceEditor;

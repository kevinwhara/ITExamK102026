import { Scissors } from 'lucide-react';
import type { ComponentProps } from 'react';

export default function AppLogoIcon(props: ComponentProps<typeof Scissors>) {
    return <Scissors {...props} />;
}

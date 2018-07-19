import FormBuilder from './FormBuilder/FormBuilder';
import Example from './example/Example';

export const MainConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: Example
        }
    ]
};

export const fuseNavigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example'
            },
            {
                'id'   : 'from-builder',
                'title': 'Form builder',
                'type' : 'item',
                'icon' : 'drag_indicator',
                'url'  : '/form-builder'
            }
        ]
    }
];
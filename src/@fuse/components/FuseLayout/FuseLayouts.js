import FuseLayout1 from './layouts/FuseLayout1';
import FuseLayout2 from './layouts/FuseLayout2';

const FuseLayouts = {
    layout1: {
        title    : 'Layout 1 - Vertical',
        type     : 'vertical',
        component: FuseLayout1,
        defaults : {
            mode   : 'fullwidth',
            scroll : 'content',
            navbar : {
                display : true,
                folded  : false,
                position: 'left'
            },
            toolbar: {
                display : true,
                style   : 'fixed',
                position: 'below'
            },
            footer : {
                display : true,
                style   : 'fixed',
                position: 'below'
            }
        },
        form     : {
            mode   : {
                title  : 'Mode',
                type   : 'radio',
                options: [
                    {
                        name : 'Boxed',
                        value: 'boxed'
                    },
                    {
                        name : 'Full Width',
                        value: 'fullwidth'
                    }
                ]
            },
            scroll : {
                title  : 'Scrollable Area',
                type   : 'radio',
                options: [
                    {
                        name : 'Body',
                        value: 'body'
                    },
                    {
                        name : 'Content',
                        value: 'content'
                    }
                ]
            },
            navbar : {
                type    : 'group',
                title   : 'Navbar',
                children: {
                    display : {
                        title: 'Display',
                        type : 'switch'
                    },
                    folded  : {
                        title: 'Folded',
                        type : 'switch'
                    },
                    position: {
                        title  : 'Position',
                        type   : 'radio',
                        options: [
                            {
                                name : 'Left',
                                value: 'left'
                            },
                            {
                                name : 'Right',
                                value: 'right'
                            }
                        ]
                    }
                }
            },
            toolbar: {
                type    : 'group',
                title   : 'Toolbar',
                children: {
                    display : {
                        title: 'Display',
                        type : 'switch'
                    },
                    style   : {
                        title  : 'Style',
                        type   : 'radio',
                        options: [
                            {
                                name : 'Fixed',
                                value: 'fixed'
                            },
                            {
                                name : 'Static',
                                value: 'static'
                            }
                        ]
                    },
                    position: {
                        title  : 'Position',
                        type   : 'radio',
                        options: [
                            {
                                name : 'Above',
                                value: 'above'
                            },
                            {
                                name : 'Below',
                                value: 'below'
                            }
                        ]
                    }
                }
            },
            footer : {
                type    : 'group',
                title   : 'Footer',
                children: {
                    display : {
                        title: 'Display',
                        type : 'switch'
                    },
                    style   : {
                        title  : 'Style',
                        type   : 'radio',
                        options: [
                            {
                                name : 'Fixed',
                                value: 'fixed'
                            },
                            {
                                name : 'Static',
                                value: 'static'
                            }
                        ]
                    },
                    position: {
                        title  : 'Position',
                        type   : 'radio',
                        options: [
                            {
                                name : 'Above',
                                value: 'above'
                            },
                            {
                                name : 'Below',
                                value: 'below'
                            }
                        ]
                    }
                }
            }
        }
    },
    layout2: {
        title    : 'Layout 2 - Horizontal',
        type     : 'horizontal',
        component: FuseLayout2,
        defaults : {
            mode   : 'fullwidth',
            scroll : 'content',
            navbar : {
                display: true
            },
            toolbar: {
                display : true,
                position: 'below'
            },
            footer : {
                display: true,
                style  : 'fixed'
            }
        },
        form     : {
            mode   : {
                title  : 'Mode',
                type   : 'radio',
                options: [
                    {
                        name : 'Boxed',
                        value: 'boxed'
                    },
                    {
                        name : 'Full Width',
                        value: 'fullwidth'
                    }
                ]
            },
            navbar : {
                type    : 'group',
                title   : 'Navbar',
                children: {
                    display: {
                        title: 'Display',
                        type : 'switch'
                    }
                }
            },
            toolbar: {
                type    : 'group',
                title   : 'Toolbar',
                children: {
                    display : {
                        title: 'Display',
                        type : 'switch'
                    },
                    position: {
                        title  : 'Position',
                        type   : 'radio',
                        options: [
                            {
                                name : 'Above',
                                value: 'above'
                            },
                            {
                                name : 'Below',
                                value: 'below'
                            }
                        ]
                    }
                }
            },
            footer : {
                type    : 'group',
                title   : 'Footer',
                children: {
                    display: {
                        title: 'Display',
                        type : 'switch'
                    },
                    style  : {
                        title  : 'Style',
                        type   : 'radio',
                        options: [
                            {
                                name : 'Fixed',
                                value: 'fixed'
                            },
                            {
                                name : 'Static',
                                value: 'static'
                            }
                        ]
                    }
                }
            }
        }
    }
};

export default FuseLayouts;

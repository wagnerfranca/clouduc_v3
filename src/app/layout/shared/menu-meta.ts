import {MenuItem} from './models/menu.model'

export const MENU: MenuItem[] = [
    {
        key: 'navigation',
        label: 'navigation',
        isTitle: true,
    },
    {
        key: 'manager',
        icon: 'uil-home-alt',
        label: 'Administração',
        collapsed: false,
        subMenu: [
            {
                key: 'ds-users',
                label: 'Usuários',
                link: '/manager/users',
                parentKey: 'manager',
            },
            {
                key: 'ds-groups',
                label: 'Grupos',
                link: '/manager/groups',
                parentKey: 'manager',
            },
            {
                key: 'ds-audit',
                label: 'Auditoria',
                link: '/manager/audit',
                parentKey: 'manager',
            },
            {
                key: 'ds-configurations',
                label: 'Configurações',
                link: '/manager/configurations',
                parentKey: 'manager',
            }
        ],
    }
]

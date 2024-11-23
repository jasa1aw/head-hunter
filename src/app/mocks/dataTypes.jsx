import { format, subDays, subWeeks, subMonths } from 'date-fns';

export const dataTypes = (t) => {
    const now = new Date();

    return [
        {
            id: 1,
            value: t('datatypes.1'),
            range: { gte: null }
        },
        {
            id: 2,
            value: t('datatypes.2'),
            range: { gte: format(subMonths(now, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSX") }
        },
        {
            id: 3,
            value: t('datatypes.3'),
            range: { gte: format(subWeeks(now, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSX") }
        },
        {
            id: 4,
            value: t('datatypes.4'),
            range: { gte: format(subDays(now, 3), "yyyy-MM-dd'T'HH:mm:ss.SSSX") }
        },
        {
            id: 5,
            value: t('datatypes.5'),
            range: { gte: format(subDays(now, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSX") }
        }
    ];
};

export const experienceOptions = (t) => [
    { id: 'noExp', label: t('experienceArray.noExperience'), value: 'not' },
    { id: '1-3', label: t('experienceArray.oneToThree'), value: '1-3' },
    { id: '3-6', label: t('experienceArray.threeToSix'), value: '3-6' },
    { id: '6-8', label: t('experienceArray.sixToEight'), value: '6-8' }
];
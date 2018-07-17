export const SET_SETTINGS = '[SETTINGS] SET SETTINGS';
export const SET_DEFAULT_SETTINGS = '[SETTINGS] SET DEFAULT SETTINGS';
export const RESET_DEFAULT_SETTINGS = '[SETTINGS] RESET DEFAULT SETTINGS';

export function setSettings(value)
{
    return {
        type: SET_SETTINGS,
        value
    }
}

export function setDefaultSettings(value)
{
    return {
        type: SET_DEFAULT_SETTINGS,
        value
    }
}

export function resetSettings(value)
{
    return {
        type: RESET_DEFAULT_SETTINGS,
        value
    }
}
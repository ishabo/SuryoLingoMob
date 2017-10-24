export const types = {
    SAVE_MODULES: 'SyroLingo/Modules/SAVE_MODULES',
    FETCH_MODULES: 'SyroLingo/Modules/FETCH_MODULES',
}

export const saveModules = (modules: IModule[]) => ({
    modules,
    type: types.SAVE_MODULES
});

export const fetchModules = () => ({
    type: types.FETCH_MODULES
})
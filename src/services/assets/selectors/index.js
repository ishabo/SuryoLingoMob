export const getSkillIcon = (icon, size) => (state) => {
    const skillIcon = state['skillIcons'][icon];
    if (skillIcon) {
        return skillIcon[size];
    }
    return {
        locked: '',
        unlocked: '',
    };
};
//# sourceMappingURL=index.js.map
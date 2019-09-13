export const getSkillsByUnit = (unit) => (state) => state.filter((skill) => skill.unit === unit);
export const getPublishedSkills = (state) => state.filter((skill) => !skill.isComingSoon);
export const getComingSoonSkills = (state) => state.filter((skill) => skill.isComingSoon);
//# sourceMappingURL=index.js.map
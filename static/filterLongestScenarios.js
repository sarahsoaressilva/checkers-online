export const filterLongestScenarios = scenariosTotal => {
    scenariosTotal.sort((a, b) => {
        return b['counter'] - a['counter'];
    })
    const maxLength = scenariosTotal[0]['counter'];
    const filteredScenarios = scenariosTotal.filter(scenario => scenario['counter'] == maxLength);
    return filteredScenarios;
}
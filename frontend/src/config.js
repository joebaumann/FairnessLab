module.exports = global.config = {
    datasets: {
        'COMPAS': {
            'group1': 'Black',
            'group2': 'white',
            'd0': 'released (D=0)',
            'd1': 'detained (D=1)',
            'y0': 'an innocent individual (Y=0)',
            'y1': 'a recidivist (Y=1)'
            
        },
        'German': {
            'group1': 'female',
            'group2': 'male',
            'd0': 'rejected (D=0)',
            'd1': 'a loan (D=1)',
            'y0': 'an individual who defaulted on the loan (Y=0)',
            'y1': 'an individual who repaid the loan (Y=1)'
            
        },
        'ACSEmploymentCA': {
            'group1': 'Black',
            'group2': 'white',
            'd0': 'predicted to be unemployed (D=0)',
            'd1': 'predicted to be employed (D=1)',
            'y0': 'an unemployed individual (Y=0)',
            'y1': 'an employed individual (Y=1)'
        },
        'Own': {
            'group1': 'group 1',
            'group2': 'group 2',
            'd0': 'negative decision (D=0)',
            'd1': 'positive decision (D=1)',
            'y0': 'an individual of type Y=0',
            'y1': 'an individual of type Y=1'
        }
    }
};
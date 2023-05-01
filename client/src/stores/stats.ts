import session from '../stores/session';

interface CategoryStats {
    categoryType: string,
    totalSpending: number,
    percentage?: number
}

interface BudgetStats {
    totalSpent: number,
    percentage?: number,
    attemptedSavings?: number,
}

// the following function returns an array of type CatagoryStats with percentage field
// being set based on the date that is inputed

export function getCategoriesAndPercentage(date?: number) : CategoryStats[] {
    let totalSpending = totalSpent(date);
    let categories = getCategoriesTotal(date);
    
    categories.forEach(category => {
        category.percentage = +((category.totalSpending/totalSpending) * 100).toFixed(2);
    });
    return categories;
}


function totalSpent(date=0) : number {
    let totalSpending = 0;
    session.user?.budgets.forEach(budget => {

        if(budget.date >= (date)) {
            budget.categories.forEach(category => {

                category.entries.forEach(entry => {
                    if(entry.date >= (date)) {
                        totalSpending += entry.spent;
                    }
                });
            });
        }

    });
    return totalSpending;
}



function getCategoriesTotal(date=0) : CategoryStats[] {
    let statCategories: CategoryStats[] = [];
    session.user?.budgets.forEach(budget => {

        if(budget.date >= (date)) {
            budget.categories.forEach(category => {

               let total = 0;     
                category.entries.forEach(entry => {
                    if(entry.date >= (date)) {
                        total += entry.spent;
                    }
                })

                let updated: Boolean = false;
                
                statCategories.forEach(statCategory => {
                    if(statCategory.categoryType.toLowerCase() == category.categoryType.toLowerCase()){
                        statCategory.totalSpending += total;
                        updated = true;
                    }
                });

                if(updated == false) {
                    statCategories.push({ categoryType: category.categoryType, totalSpending: total });
                }
            });
        }
    });
    return statCategories;
}

export function underOverBudget() : BudgetStats {
    let totalSpent = 0;
    session.user?.budgets[0].categories.forEach(category => {
        category.entries.forEach(entry => {
            totalSpent += entry.spent;
        })
    })
    let percentage = +(totalSpent/(session.user?.budgets[0].spendingLimit ?? 0) * 100).toFixed(2);
    return { totalSpent: totalSpent, percentage: percentage }
}

export function underOverAll(date=0) : BudgetStats {
    let totalAttempedSaveings = 0;
    let totalSpent = 0;
    session.user?.budgets.forEach(budget => {
        if(budget.date >= date) {
            totalAttempedSaveings += budget.spendingLimit;

            budget.categories.forEach(category => {

                category.entries.forEach(entry => {
                    if(entry.date >= (date)) {
                        totalSpent += entry.spent;
                    }
                });
            });
        }
    });
    return { totalSpent: totalSpent, attemptedSavings: totalAttempedSaveings }
}





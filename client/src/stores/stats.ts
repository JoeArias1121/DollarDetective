import session from '../stores/session';

interface CategoryStats {
    categoryType: string,
    totalSpending: number,
    percentage?: number
}

// the following function returns an array of type CatagoryStats with percentage field
// being set based on the date that is inputed

export function getCategoriesAndPercentage(date?: number) : CategoryStats[] {
    let totalSpending = totalSpent(date ?? undefined);
    let categories = getCategoriesTotal(date ?? undefined);
    
    categories.forEach(category => {
        category.percentage = +((category.totalSpending/totalSpending) * 100).toFixed(2);
    });
    return categories;
}


function totalSpent(date?: number) : number {
    let totalSpending = 0;
    session.user?.budgets.forEach(budget => {

        if(budget.date >= (date ?? 0)) {
            budget.categories.forEach(category => {

                category.entries.forEach(entry => {
                    if(entry.date >= (date ?? 0)) {
                        totalSpending += entry.spent;
                    }
                });
            });
        }

    });
    return totalSpending;
}



function getCategoriesTotal(date?: number) : CategoryStats[] {
    let statCategories: CategoryStats[] = [];
    session.user?.budgets.forEach(budget => {

        if(budget.date >= (date ?? 0)) {
            budget.categories.forEach(category => {

               let total = 0;     
                category.entries.forEach(entry => {
                    if(entry.date >= (date ?? 0)) {
                        total += entry.spent;
                    }
                })

                let updated: Boolean = false;
                
                statCategories.forEach(statCategory => {
                    if(statCategory.categoryType == category.categoryType.toLowerCase()){
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






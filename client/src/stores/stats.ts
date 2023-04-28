import session from '../stores/session';

interface CategoryStats {
    category: string,
    totalSpending: number,
    percentage?: number
}

// the following function returns an array of type CatagoryStats with percentage field
// being set based on the date that is inputed

export function getCategoriesAndPercentage(date?: number) : CategoryStats[] {
    let totalSpending = totalSpent(date ?? undefined);
    let categories = getCategoriesTotal(date ?? undefined);
    
    categories.forEach(category => {
        category.percentage = (category.totalSpending/totalSpending) * 100;
    });
    return categories;
}


function totalSpent(date?: number) : number {
    let totalSpending = 0;
    session.user?.budgets.forEach(budget => {
        budget.spending.forEach(entry => {

            if(entry.date >= (date ?? 0)) {
                totalSpending += entry.value;
            }
        });
    });
    return totalSpending;
}



function getCategoriesTotal(date?: number) : CategoryStats[] {
    let categories: CategoryStats[] = [];
    session.user?.budgets.forEach(budget => {
        budget.spending.forEach(entry => {
            if(entry.date >= (date ?? 0)) {

                categories.forEach(category => {
                    if(category.category == entry.category.toLowerCase()) {
                        category.totalSpending += entry.value;
                    }
                    else {

                    }
                });
                if (categories.length == 0) {
                    categories.push({ category: entry.category.toLowerCase(), totalSpending: entry.value });
                }
            }
        });
    });
    return categories;
}






const BlogForm = () => {
    const onSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted')
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="new-expense__control">
                        <label>Title</label>
                        {/*Two-way binding. When the form is submitted the 'title' will be re-set to the provided 'value' */}
                        <input type="text" value={title} onChange={onTitleChange}/>
                    </div>
                    <div className="new-expense__control">
                        <label>Amount</label>
                        {/*Two-way binding. When the form is submitted the 'amount' will be re-set to the provided 'value' */}
                        <input
                            type="number"
                            value={amount}
                            min="0.01"
                            step="0.01"
                            onChange={onAmountChange}
                        />
                    </div>
                    <div className="new-expense__control">
                        <label>Date</label>
                        {/*Two-way binding. When the form is submitted the 'date' will be re-set to the provided 'value' */}
                        <input
                            type="date"
                            value={date}
                            min="2019-01-01"
                            max="2022-12-31"
                            onChange={onDateChange}
                        />
                    </div>
                </div>
                <div className="new-expense__actions">
                    <button onClick={onCancelButtonClicked}>Cancel</button>
                    <button>Add Expense</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm;
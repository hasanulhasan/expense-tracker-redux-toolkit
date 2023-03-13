import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransactions, fetchTransactions } from '../features/transactionSlice';

const Form = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => state.transaction);
  const editItem = useSelector(state => state.transaction.editItem)
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const { id, name, amount, type } = editItem || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type)
    }
    else {
      setEditMode(false)
      reset();
    }
  }, [editItem])

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  const reset = () => {
    setName('');
    setAmount('');
    setType('');
  }

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTransactions({
      name, type, amount: Number(amount)
    }))
    reset();
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(changeTransaction({
      id: editItem?.id,
      data: {
        name: name,
        amount: amount,
        type: type
      }
    }))
    setEditMode(false);
    reset();
  }
  const cancelEditMode = () => {
    reset();
    setEditMode(false)

  }


  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="type"
              checked={type === 'income'}
              onChange={e => setType('income')}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === 'expense'}
              onChange={e => setType('expense')}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            required
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button disabled={isLoading} type='submit' className="btn">{editMode ? 'Update Transaction' : 'Add Transaction'}</button>
      </form>

      {
        !isLoading && isError && <p className='error'>There was an error</p>
      }

      {
        editMode && <button onClick={cancelEditMode} className="btn cancel_edit">Cancel Edit</button>
      }
    </div>
  );
};

export default Form;
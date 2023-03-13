import React from 'react';
import editImg from '../../src/images/edit.svg'
import dltImg from '../../src/images/delete.svg'
import { useDispatch } from 'react-redux';
import { editActive, removeTransaction } from '../features/transactionSlice';
import numberWithCommas from '../Utils/thosandSeparate';

const Transaction = ({ transaction }) => {
  const dispatch = useDispatch();
  const { id, name, amount, type } = transaction || {};

  const editHandle = () => {
    dispatch(editActive(transaction))
  }
  const handleDelete = (id) => {
    dispatch(removeTransaction(id))
  }
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button onClick={editHandle} className="link">
          <img alt='...'
            className="icon"
            src={editImg}
          />
        </button>
        <button onClick={() => handleDelete(id)} className="link">
          <img
            alt='...'
            className="icon"
            src={dltImg}
          />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
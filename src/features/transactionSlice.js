import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI"

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: '',
  editItem: {}
}

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
  const transactions = await getTransactions();
  return transactions;
})

export const createTransactions = createAsyncThunk('transaction/createTransactions', async (data) => {
  const transaction = await addTransaction(data);
  return transaction;
})

export const changeTransaction = createAsyncThunk('transaction/changeTransaction', async ({ id, data }) => {
  const transaction = await editTransaction(id, data);
  return transaction;
})

export const removeTransaction = createAsyncThunk('transaction/removeTransaction', async (id) => {
  const transaction = await deleteTransaction(id);
  return transaction;
})

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editItem = action.payload;
    },
    editInActive: (state) => {
      state.editItem = {}
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message
        state.transactions = action.payload;
      })
      .addCase(createTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message
      })
      .addCase(changeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id);
        state.transactions[indexToUpdate] = action.payload;

      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = state.transactions.filter(t => t.id !== action.meta.arg)

      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message
      })
  }
})

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions

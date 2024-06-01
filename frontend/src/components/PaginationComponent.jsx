import usePagination from '../hooks/usePagination';
import { useDispatch} from 'react-redux';
import { setLimitTodosOnPage } from '../redux/actions';
import {useEffect} from 'react';


export default function PaginationComponent() {


const  { array, page, handlePageChange } = usePagination();

const  dispatch = useDispatch();

useEffect(() => {
    handlePageChange(1);
}, []);

return (
        <>
        <div className="mt-12 mb-6 page-maincontainer">
            <div className="page-container flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center">
                <label htmlFor="options" className="text-purple-500 text-2xl italic">Кількість нотаток на сторінці:</label>
                <select
                    onChange={(e) => dispatch(setLimitTodosOnPage(parseInt(e.target.value)))}
                    className="ml-6 block appearance-none w-16 bg-white border border-none hover:border-gray-500 px-4 py-2 pr-3 text-xl text-blue-800 text-center font-bold rounded shadow-2xl leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue="3">
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                </select>
            </div>
            <ul className="flex mt-10 space-x-1">
                <li className="page-item">
                <span
                    onClick={() => handlePageChange('&laquo;')}
                    className="cursor-pointer bg-green-100 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded">
                    &laquo;
                </span>
                </li>
                <li className="page-item">
                <span
                    onClick={() => handlePageChange('&lsaquo;')}
                    className="cursor-pointer bg-green-200 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded">
                    &lsaquo;
                </span>
                </li>
                {array.map((value, index) => {
                if (value === page) {
                    return (
                    <li key={index} className="page-item">
                        <span
                        onClick={() => handlePageChange(value)}
                        className="cursor-pointer bg-green-500 text-white text-2xl font-bold py-2 px-4 rounded">
                        {value}
                        </span>
                    </li>
                    );
                } else {
                    return (
                    <li key={index} className="page-item">
                        <span
                        onClick={() => handlePageChange(value)}
                        className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded">
                        {value}
                        </span>
                    </li>
                    );
                }
                })}
                <li className="page-item">
                <span
                    onClick={() => handlePageChange('&rsaquo;')}
                    className="cursor-pointer bg-green-200 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded">
                    &rsaquo;
                </span>
                </li>
                <li className="page-item">
                <span
                    onClick={() => handlePageChange('&raquo;')}
                    className="cursor-pointer bg-green-100 hover:bg-gray-400 text-gray-800 text-xl font-bold py-2 px-4 rounded">
                    &raquo;
                </span>
                </li>
            </ul>
            </div>
        </div>
        </>
    );
}

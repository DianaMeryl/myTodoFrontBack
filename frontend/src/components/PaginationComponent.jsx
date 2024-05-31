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
        <div className="page-maincontainer">
            <div className="page-container flex flex-col items-center">
            <select
                onChange={(e) => dispatch(setLimitTodosOnPage(parseInt(e.target.value)))}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                defaultValue="3">
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="6">6</option>
            </select>
            <ul className="flex mt-4 space-x-1">
                <li className="page-item">
                <span
                    onClick={() => handlePageChange('&laquo;')}
                    className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    &laquo;
                </span>
                </li>
                <li className="page-item">
                <span
                    onClick={() => handlePageChange('&lsaquo;')}
                    className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    &lsaquo;
                </span>
                </li>
                {array.map((value, index) => {
                if (value === page) {
                    return (
                    <li key={index} className="page-item">
                        <span
                        onClick={() => handlePageChange(value)}
                        className="cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        {value}
                        </span>
                    </li>
                    );
                } else {
                    return (
                    <li key={index} className="page-item">
                        <span
                        onClick={() => handlePageChange(value)}
                        className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        {value}
                        </span>
                    </li>
                    );
                }
                })}
                <li className="page-item">
                <span
                    onClick={() => handlePageChange('&rsaquo;')}
                    className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    &rsaquo;
                </span>
                </li>
                <li className="page-item">
                <span
                    onClick={() => handlePageChange('&raquo;')}
                    className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    &raquo;
                </span>
                </li>
            </ul>
            </div>
        </div>
        </>
    );
}

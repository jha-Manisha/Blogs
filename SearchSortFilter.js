import { Component } from 'react';
import './index.css';


export default class SearchSortFilter extends Component {
    render() {
        const { handleSearchChange, search, endDate, startDate, handleEndDateChange, handleStartDateChange, handleSort } = this.props
        return (
            <div>
                <div className='sortFilter'>
                    <lable>
                        Search:<input placeholder='Search by Title'
                            type="text" value={search} onChange={handleSearchChange} />
                    </lable>

                    <lable>
                        <input type="datetime-local" value={startDate} onChange={handleStartDateChange} />
                    </lable>

                    <lable>
                        <input type="datetime-local" value={endDate} onChange={handleEndDateChange} />
                    </lable>

                    <button className='btn2' onClick={() => handleSort('newest')}>
                        Newest
                    </button>

                    <button className='btn2' onClick={() => handleSort('oldest')}>
                        Oldest
                    </button>
                </div>
            </div>
        )
    }
}
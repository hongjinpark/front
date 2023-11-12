import React, {useEffect, useState} from "react";
import axios from "axios";

function Test() {

    const[data, setData] = useState([{
        update_time: '',
        contents: '',
        nickname: '',
    }]);

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8090/comment/list/3');
        setData(response.data);

    };
    useEffect(() => {
        fetchData();
    }, []);

    /*let copy = [...data];
    setData(data);*/

    const dataList = data.map((data) =>
        <div key={data.index}>
            <div>update_time={data.update_time}</div>
            <div>contents={data.contents}</div>
            <div>nickname={data.nickname}</div>
        </div>
    )


    return (

        <div className='Test'>

            <div>
                {dataList}
            </div>


        </div>


    );
}

export default Test;
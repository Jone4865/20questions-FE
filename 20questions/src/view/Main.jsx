import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Pagination from "../components/Pagination"
import PostingModal from "../components/PostingModal";
import DetailModal from "../components/DetailModal"
import { __getList } from '../redux/modules/MainList'

function Main() {

    const dispatch = useDispatch();
    const ingLists = useSelector((state) => state.getlist.data)

    useEffect(() => {
        dispatch(__getList());
    }, []);

    const [limit] = useState(6);
    const [page, setPage] = useState(1);

    const [categoty, setCategoty] = useState(2);
    const handleChange = (e) => {
        setCategoty(e.target.value)
    }

    const indexOfLastPost = page * limit;
    const indexOfFirstPost = indexOfLastPost - limit;
    const currentCountings = ingLists.slice(
        indexOfFirstPost,
        indexOfLastPost
    );

    let [postingmodal, setPostingModal] = useState(false);
    let [detailmodal, setDetailModal] = useState(false);

    return (
        <MainBox>
            <Select>
                <select onChange={(e) => handleChange(e)}>
                    <option value={2}>--- 카테고리 선택 ---</option>
                    <option value={1}>인물</option>
                    <option value={2}>동물</option>
                    <option value={3}>영화</option>
                    <option value={4}>음악</option>
                    <option value={5}>가전제품</option>
                    <option value={6}>기타</option>
                    <option value={7}>완료된 문제</option>
                </select>
            </Select>
            <IngList>
                {currentCountings.map((count) => (
                    count.category === +categoty ?
                        <div key={count.quizId} onClick={() => {
                            setDetailModal(true);
                        }}>
                            <Img></Img>
                            <p>제목 {count.title}</p>
                            <p>작성자 {count.nickname}님</p>
                            <p>작성자 답변 개수{count.count} / 20</p>
                            <p>작성 일자 {count.date}</p>
                        </div> :
                        ''
                ))}
            </IngList>
            <PostBtn onClick={() => {
                setPostingModal(true);
            }}>글쓰기</PostBtn>
            <footer>
                <Pagination
                    total={ingLists.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </footer>
            {postingmodal === true ? <PostingModal /> : ''}
            {detailmodal === true ? <DetailModal /> : ''}
        </MainBox>
    );
}

export default Main;

let MainBox = styled.div`
    height: 530px;
    width: 90%;
    margin: 10px auto;
`

let Select = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    div {
        margin-right: 10px;
    }
    select {
        padding: 2px;
        text-align: center;
        width: 30%;
        border-radius: 5px;
    }
`

let IngList = styled.div`
    height:455px;
    background-color: #c4c41127;
    margin: 8px auto 8px auto;
    border-radius: 10px;
    border: solid 3px gray;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: 6px 6px 6px 6px #0000ff19;
    padding: 5px;

    
    flex-direction: column;
        align-items: center;
    div { 
        width: 30%;
        height: 215px;
        margin: 3px;
        background-color: #00000031;
        border-radius: 10px;
        border: solid 3px gray;
        box-shadow: 6px 6px 6px 6px #0000ff19;
        white-space: nowrap;
        p {
            margin: 5px auto auto 5px;
            font-weight: bold;
        }
    }
    `

let PostBtn = styled.button`
    margin: auto 0 0 auto;
    height: 30px;
    display : flex;
    justify-content : center;
    align-items : center;
    
    min-width: 80px;
    margin-right: 3px;
    padding: 3px;
    border: 1px solid #ff00668d;
    border-radius: 4px;
    background-color: #ff00668a;
    color: white;
`

const Img = styled.p`
    margin: auto;
    width: 95%;
    height: 100px;
    background-size: cover;
    background-position: center;
    background-color: transparent;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.266), rgba(220, 207, 207, 0.541)), url("https://tse4.mm.bing.net/th?id=OIP.7qq-I6LTpKgoV7idhqMfQgHaHV&pid=Api&P=0");
`
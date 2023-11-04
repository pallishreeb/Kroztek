/** @format */

import React, { useEffect, useState } from "react";
import { Dropdown, Space, Menu as Menu1 } from "antd";
import { allCategories } from "../networkCalls/categories";
import { Link } from "react-router-dom";
import { usePostApi } from "../context/PostProvider";

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const { dispatch } = usePostApi();
    useEffect(() => {
        allCategories()
            .then((res) => {
                setCategories(res);
            })
            .catch((err) => {
                console.log("Error in fetch catgory", err);
            });
    }, []);

    const menu = () => (
        <Menu1 style={{maxHeight:"450px", overflowY: "auto"}}>
            {categories?.length > 0 &&
                categories?.filter((item) => item.isActive).map((category) => (
                    <Link
                        to={`/post/category/${category._id}/${category?.categoryName}`}
                        key={category._id}
                        onClick={() => {
                            dispatch({
                                type: "CLEAR_FILTERS",
                            });
                            dispatch({
                                type: "FILTER_POSTS_BY_CATEGORY",
                                payload: category._id,
                            });
                        }}
                    >
                        <Menu1.Item key={category._id}>{category.categoryName}</Menu1.Item>
                    </Link>
                ))}
        </Menu1>
    );
    return (
        <Space class="nav justify-content-center">
            <Dropdown
                overlay={menu}
                arrow={{
                    pointAtCenter: true,
                }}
                class="nav-item"
            >
                <div onClick={(e) => e.preventDefault()}>
                    <Space >
                    <Link
                        to={`/category`}>
                        Categories
                        <i className="fa fa-arrow-down" />
                        </Link>
                    </Space>
                </div>
            </Dropdown>
        </Space>
    );
};

export default Menu;

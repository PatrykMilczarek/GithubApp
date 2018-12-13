import * as React from "react";
import { Row, Col, Card, Table } from "antd";
import RepoContent from "../RepoContent";
import { IUserContentProps } from "../../types/UserContent.types";

const { Meta } = Card;


const userInfoLabels: any = {
  email: "E-Mail",
  followers: "Followers",
  location: "Location"
};

const UserContent = (props: IUserContentProps) => {
  const { basicInfo, repositories } = props.userData;

  const renderUserBasicInfo = () => {
    return (
        <Card
          hoverable
          className="usercard"
          cover={
            <a href={basicInfo.html_url} target="_blank" style={{}}><img
              width="240"
              height="240"
              alt="avatar"
              src={basicInfo.avatar_url}
            /></a>
          }
        >
          <Meta title={basicInfo.login} description={renderUserDescription()} />
        </Card>
    );
  };

  const renderUserDescription = () => {
    return (
      <ul className="userdesc__list">
        {Object.keys(userInfoLabels).map((key: string) =>
          basicInfo[key] !== null ? (
            <li key={key}>{`${userInfoLabels[key]}: ${basicInfo[key]}`}</li>
          ) : null
        )}
      </ul>
    );
  };

  return (
    <>
      <Row gutter={8} data-test="user-content">
        <Col span={6} data-test="user-basicinfo">{ renderUserBasicInfo() }</Col>
        <Col span={16}>
          <RepoContent data={repositories} />
        </Col>
      </Row>
    </>
  );
};

export default UserContent;

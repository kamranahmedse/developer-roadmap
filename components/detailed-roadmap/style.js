import styled from 'styled-components';

export const SummaryContainer = styled.div``;

export const Summary = styled.div`
  text-align: left;
  min-height: 400px;
  display: flex;

  .container {
    position: relative;
  }
`;

export const PageHeader = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;

  h3 {
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 21px;
  }

  p {
    margin-bottom: 0;
    font-size: 14px;
    color: #696969;
    
    a {
      color: #101010;
    }
  }
`;

export const RoadmapMeta = styled.div`
  flex: 1;
`;

export const ShareRoadmap = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-bottom: 0;
    & + a {
      margin-left: 5px;
    }
  }
`;

export const Sidebar = styled.div`
  border-left: 1px solid #efefef;
  padding-bottom: 150px;

  ul {
      list-style: none;
      margin: 0;
      padding: 0;
  }
  
  .bullet {
    display: inline-block;
    margin-right: 7px;
    width: 7px;
    height: 7px;
    min-width: 7px;
    border-radius: 100%;
    background: #efefef;
    transform: translateX(-4px);
    transition: background 0.5s ease;
  }

  
  .links-group {
    padding: 30px 0 10px;
    width: 260px;

    h3 {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      padding-left: 20px;
    }
  }
  
  .links-group li {
    list-style: none;
    margin: 7px 0;

    a {
      font-size: 14px;
      font-weight: normal;
      color: #696969;
    }
    
    .bullet {
      display: inline-block;
      margin-right: 12px;
      width: 7px;
      height: 7px;
      min-width: 7px;
      border-radius: 100%;
      background: #efefef;
      transform: translateX(-4px);
      transition: background 0.5s ease;
    }
  }
`;

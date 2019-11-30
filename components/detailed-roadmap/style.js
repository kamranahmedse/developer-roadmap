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

export const MobileNavHeader = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  position: relative;
`;

export const SidebarButton = styled.button`
  background: transparent;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  -webkit-appearance: none;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
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

export const MobileSidebarWrap = styled.div`
  position: absolute;
  z-index: 999;
  background: white;
  width: 100%;
  left: 0;
  bottom: 100%;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 20px;
  top: calc(100% + 1px);
  transition: bottom 0.5s ease 0s;

  &.visible {
    bottom: -50vh;
  }
`;

export const MobileSidebar = styled(Sidebar)`
  margin-left: 12px;
  padding-bottom: 20px;

  .links-group {
    width: auto;  
  }
`;

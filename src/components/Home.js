import React,{useEffect} from 'react'
import { Layout, Menu,Input } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    EnvironmentOutlined,
    FontSizeOutlined,
    SearchOutlined
  } from '@ant-design/icons';
import './Home.css';
import RadioCard from './RadioCard';

const { Header, Sider, Content } = Layout;

const Home = () => {
    const [collapsed,setCollapsed]=React.useState(false);
    const [radioList,setRadioList]=React.useState([]);
    const [margin,setMargin]=React.useState('200px');
    const [search,setSearch]=React.useState('i');
    const apiURL='https://de1.api.radio-browser.info/json/stations?limit=400&offset=1000';
    // without limit it will get slow
    const [filterParam,setFilterParam]=React.useState('country');


    const onSearch = event => setSearch(event.target.value);


    const handleClick=(e)=>{
      console.log('click',e);
      if (e.key==="1"){
        setFilterParam('country');
      }else{
        setFilterParam('language')
      }
    }

    const toogle =()=>{
        setCollapsed(!collapsed)
        setMargin(collapsed?'200px':'80px');
        
    }
    
    useEffect(() => {
      fetch(apiURL)
      .then(response=>response.json())
      .then(data=>{setRadioList(data);console.log(data);});
      console.log('set url')
    }, [apiURL])

    return (
        <Layout style={{height:"100vh"}} >
        <Sider  trigger={null} 
                collapsible 
                collapsed={collapsed}
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                }}
                className="sidewide"
                breakpoint='lg'
        >
          <Menu onClick={handleClick} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<EnvironmentOutlined />}>
              By Country
            </Menu.Item>
            <Menu.Item key="2" icon={<FontSizeOutlined />}>
              By Language
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{marginLeft:margin}} >
          <Header className="site-layout-background" style={{ padding: 0}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toogle,
            })}
            <h3 style={{display:'inline-block',textAlign:'center',marginLeft:'20px'}}>Community Radio Stations</h3>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              width:'auto',
              textAlign:'center',
              display:"flex",
              flexWrap:"wrap",
              overflow:'initial',
              justifyContent:'space-between'
            }}
          >


            <Input size="large" onChange={onSearch} allowClear style={{borderRadius:'1em',marginBottom:'2em',width:'90%',marginLeft:'auto',marginRight:'auto'}}placeholder="Search Station" prefix={<SearchOutlined />} />
            {radioList.filter(radio=> radio[filterParam].toLowerCase().includes(search.toLowerCase())).map((radio,v)=><RadioCard name={radio.name} key={v} language={radio.language} country={radio.country} votes={radio.votes} url={radio.url} bitrate={radio.bitrate}/>)}
            
          </Content>
        </Layout>
      </Layout>
    )
}

export default Home

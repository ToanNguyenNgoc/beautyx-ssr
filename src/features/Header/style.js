import {makeStyles} from '@mui/styles'

export const headerStyle = makeStyles({
      header:{
            width:"100%",
            height:"98px",
            backgroundColor:"var(--bg-gray)",
      },
      container:{
            height:'100%'
      },
      headerContainer:{
            height:'100%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
      },
      headerBtn:{
            outline:'none',
            padding:'8px 16px',
            borderRadius:'18px',
            cursor:'pointer',
            border:'solid 1px var(--purple)',
            color:'var(--purple)',
            fontSize:'14px',
            lineHeight:'20px',
            fontWeight:'700'
      },
      headerRight:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
      },
      headerRightList:{
            paddingLeft:'0px',
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
      },
      headerAvatar:{
            width:'36px',
            height:'36px',
            borderRadius:'100%'
      },
      headerUserName:{
            fontSize:'14px',
            lineHeight:'20px',
            fontWeight:'700',
            color:'var(--purple)',
            position:'relative'
      },
      headerDotNo:{
            margin:'-15px 0px 0px 24px',
            position:'absolute',
            width:'12px',
            height:'12px',
            backgroundColor:'var(--red-cl)',
            borderRadius:'100%'
      },
      headerRightItem:{
            cursor:'pointer',
            padding:'0px 16px',
            listStyle:'none'
      },
      // notification
      noBox:{
            display:'block',
            marginTop:'17px',
            marginLeft:'-28%',
            width:'440px',
            position:'absolute',
            backgroundColor:'var(--bg-gray)',
            padding:'36px',
            boxShadow:'0px 10px 31px rgba(76, 62, 142, 0.3)',
            borderRadius:'24px',
            flexDirection:'column'
      },
      noBoxTitle:{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            color:'var(--purple)',
            paddingBottom:'8px',
            borderBottom:'solid 1px var(--purple)'
      },
      noBoxTitleText:{
            fontSize:'20px',
            lineHeight:'27px',
            fontWeight:'700',
      },
      noBoxTitleCheck:{
            display:'flex',
            alignItems:'center',
            fontSize:'14px',
            lineHeight:'20px',
            fontWeight:'500'
      },
      noList:{
            paddingLeft:'0px',
      },
      noItem:{
            listStyle:'none',
            padding:'8px 0px'
      },
      noItemBox:{
            display:'flex',
            alignItems:'center'
      },
      noBoxItemText:{
            paddingLeft:'16px'
      },
      noItemOrg:{
            fontSize:'14px',
            lineHeight:'20px',
            color:'var(--text-black)',
            margin:'0px 0px'
      },
      noItemContent:{
            fontWeight:'500',
            fontSize:'14px',
            lineHeight:'20px',
            color:'var(--text-black)',
            margin:'4px 0px'
      },
      noItemTime:{
            fontWeight:'500',
            fontSize:'11px',
            lineHeight:'12px',
            color:'var(--text-hover)'
      },
      // Menu
      menu:{
            position:'relative'
      },
      menuBox:{
            padding:'36px',
            position:'absolute'
      }
})
import slider from "../assets/slider.jpeg"
import { Carousel } from 'antd'
import slider2 from "../assets/slider2.jpeg"

const Home = ()=>{

    // const contentStyle = {
    //     margin: 0,
    //     height: '400px',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    //     width : "100%",
    //     display: "flex",
    //     flexWrap: "wrap"
    //   };
    
      const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
    return(
        
           <Carousel effect="fade" autoplay className="c-head" afterChange={onChange}>
      <div>
       <img src={slider} alt=""  className="slide"/>
      </div>
      <div>
      <img src={slider2} alt=""  className="slide"/>
      </div>
      
    </Carousel>
        
    )
}

export default Home
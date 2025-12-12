import Slideshow from "../../components/Slideshow";

function UserPage() {
  const slides = [
    {
      id: 1,
      image:
        "https://brand-pcms.ggg.systems/media/so/homecmsdata/banners/TGS_news_Feature.png",
      title: "Slide 1",
      subtitle: "Subtitle 1",
    },
    {
      id: 2,
      image:
        "https://brand-pcms.ggg.systems/media/so/homecmsdata/banners/Menuboard_Adapt-online__1500W-x-700H_px_n_n.jpg",
      title: "Slide 2",
      subtitle: "Subtitle 2",
    },
    {
      id: 3,
      image:
        "https://brand-pcms.ggg.systems/media/so/homecmsdata/banners/MW_B_T_I_150K_-_WEBSITE_BANNER.png",
      title: "Slide 3",
      subtitle: "Subtitle 3",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="max-w-5xl mx-auto">
        <Slideshow slides={slides} />
      </div>
      <div className="max-w-5xl mx-auto p-4">
        <img
          src="https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2025/06/Banner-web-MW-T6-HN-scaled.jpg"
          alt="abc"
        />
      </div>
      <div className="flex gap-4 max-w-5xl mx-auto justify-between items-center p-4">
        <div className="flex-1">
          <img
            src="https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2022/06/manwah-lau-dai-loan-home-1-scaled.jpeg"
            alt="abc"
            className="flex-1"
          />
        </div>
        <div className="flex-1">
          <img
            src="https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2022/06/manwah-lau-dai-loan-home-2-scaled.jpeg"
            alt="abc"
            className="flex-1"
          />
        </div>
      </div>
      <div className="max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold">Lẩu Đài Loan</h2>
        <p className="text-gray-500">
          Sau hàng trăm năm tồn tại trong cuộc sống người Đài, lẩu Đài Loan
          không chỉ đơn thuần là sự kết hợp của các nguyên liệu quen thuộc, mà
          liên tục được cải tiến và hoàn thiện, từ thế hệ này sang thế hệ khác.
          Thực khách đến Manwah sẽ được tự mình khám phá hành trình ẩm thực đặc
          sắc với nước lẩu ngọt vị tự nhiên, kết hợp hầm cùng các loại gia vị
          dậy mùi thơm đặc trưng của Đài Loan. Nét đặc sắc không chỉ đến từ nước
          lẩu, mà còn đến từ cả những món nhúng kiểu Đài – bạn sẽ tìm thấy nhiều
          hơn là chỉ thịt bò và các loại rau thơm. Chính sự kết hợp các nguyên
          liệu, món ăn hài hoà sẽ tạo nên hương vị lẩu Đài Loan tỉ mỉ và tinh
          tế.
        </p>
      </div>
      <div className="max-w-5xl mx-auto p-4">
        <img
          src="https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2022/10/manwah-hanh-trinh-van-dam-hn.jpg"
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-4 items-center justify-center text-center">
        <h2 className="text-2xl font-bold">
          Hành trình vạn dặm – Manwah đến Lê Thái Tổ
        </h2>
        <p className="text-gray-500">
          Đặt phép tương phản trong mọi yếu tố thiết kế - từ màu sắc tới họa
          tiết hay ánh sáng... Manwah Lê Thái Tổ mang đậm âm hưởng Đài Loan
          truyền thống nhưng cũng thật phóng khoáng, vừa trang nhã lại không kém
          phần mỹ lệ, thân thuộc và cũng đầy khác biệt.
        </p>
      </div>
      <div className="max-w-5xl w-full mx-auto p-4">
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/tsvpW_-oxm8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-bold">The New Manwah - New Identity</h2>
        <p className="text-gray-500">
          🎴Là lẩu Đài nguyên bản, nhưng không kém phần trẻ trung và hội nhập!
          Không tự giới hạn mình trong phạm vi ẩm thực, Manwah luôn muốn đan cài
          các yếu tố văn hóa vào thương hiệu. Lần “dịch chuyển” này, Manwah xích
          lại gần đời sống của khách hàng hơn! Bạn có thể thấy những màu sắc,
          hoa văn, nguồn cảm hứng rất gần gũi, mà bạn đã gặp ở đâu đó trong các
          bộ phim Đài Loan tuổi thơ hay những hình ảnh đặc trưng của đất nước
          này. Một hành trình mới nhưng tâm ý không đổi, hi vọng rằng bạn sẽ
          luôn cảm thấy mình trong Manwah nhé!
        </p>
      </div>
    </div>
  );
}

export default UserPage;

import { Link } from 'react-router';

export default function About() {
  return (
    <div className="bg-brand-light font-sans">
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="relative bg-brand-cool2 text-brand-light py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Chào Mừng Đến Với City House Homestay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Trải nghiệm Hà Nội như người bản địa tại không gian lưu trú ấm cúng, kết hợp nét truyền thống và tiện nghi hiện đại.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-brand-light to-transparent"></div>
      </header>

      {/* Story Section */}
      <section className="py-16 bg-brand-light2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Câu Chuyện Của Chúng Tôi</h2>
            <p className="text-brand-dark leading-relaxed">
              Được thành lập vào năm 2020 bởi những người trẻ đam mê văn hóa Hà Nội, City House Homestay ra đời từ mong muốn mang đến một không gian lưu trú không chỉ là nơi nghỉ ngơi, mà còn là nơi bạn cảm nhận được hồn cốt của thủ đô. Mỗi góc nhỏ của homestay đều được chăm chút với cảm hứng từ tranh Đông Hồ, nội thất gỗ tự nhiên và sự ấm áp như ở nhà.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="story.jpg" alt="City House Story" className="w-full h-64 md:h-96 object-fill rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">Điều Gì Làm City House Homestay Đặc Biệt?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-light3 p-6 rounded-lg shadow-md text-center hover:bg-brand-warm2 transition-colors">
              <h3 className="text-xl font-semibold text-brand-dark mb-2">Vị Trí Lý Tưởng</h3>
              <p className="text-brand-dark">Chỉ cách Hồ Hoàn Kiếm 5 phút đi bộ, gần Phố Cổ, Nhà Hát Lớn và các điểm tham quan nổi tiếng.</p>
            </div>
            <div className="bg-brand-light3 p-6 rounded-lg shadow-md text-center hover:bg-brand-warm2 transition-colors">
              <h3 className="text-xl font-semibold text-brand-dark mb-2">Không Gian Độc Đáo</h3>
              <p className="text-brand-dark">Thiết kế với cảm hứng từ văn hóa Việt Nam, kết hợp nội thất thủ công và không gian xanh.</p>
            </div>
            <div className="bg-brand-light3 p-6 rounded-lg shadow-md text-center hover:bg-brand-warm2 transition-colors">
              <h3 className="text-xl font-semibold text-brand-dark mb-2">Trải Nghiệm Địa Phương</h3>
              <p className="text-brand-dark">Tham gia tour xe đạp, lớp nấu phở, hoặc khám phá Hà Nội cùng hướng dẫn viên bản địa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-brand-cool2">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-light mb-12">Khám Phá City House Homestay</h2>
          <div className="grid grid-cols-4 gap-4 place-items-center">
            <img src="fanpage.jpg" alt="fanpage" className="w-90 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform" />
            <img src="tiktok.jpg" alt="tiktok" className="w-90 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform" />
            <img src="instagram.jpg" alt="instagram" className="w-90 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform" />
            <img src="threads.jpg" alt="threads" className="w-90 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-cool3 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">Đặt Phòng Ngay Hôm Nay!</h2>
          <p className="text-lg text-brand-dark mb-6 max-w-xl mx-auto">
            Hãy để City House Homestay trở thành ngôi nhà thứ hai của bạn tại Hà Nội. Khám phá thủ đô theo cách riêng của bạn!
          </p>
          <Link
            to={"/search-room"}
            className="inline-block bg-brand-cool2 text-brand-light py-3 px-8 rounded-full text-lg font-semibold hover:bg-brand-cool transition-colors"
          >
            Đặt Phòng Ngay
          </Link>
        </div>
      </section>
    </div>
  )
}
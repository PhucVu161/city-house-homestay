import { Link } from 'react-router';
import { Search } from '../components';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-light font-sans">
      <style>
        {`
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.8s ease-out;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="relative h-screen bg-brand-cool3 text-brand-light flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="home.jpg"
            alt="Hanoi Cityscape"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-brand-cool3/20"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            City House Homestay
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-slide-up">
            Trải nghiệm Hà Nội như người bản địa với không gian lưu trú ấm cúng, đậm chất văn hóa và tiện nghi hiện đại.
          </p>
          <Link
            to={"/search-room"}
            className="inline-block bg-brand-warm2 text-brand-light py-3 px-8 rounded-full text-lg font-semibold hover:bg-brand-warm3 transition-colors animate-pulse"
          >
            Đặt Phòng Ngay
          </Link>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-brand-light2">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-12 animate-slide-up">
            Tại Sao Chọn City House Homestay?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-light3 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <img src="location.jpg" alt="Location" className="w-36 h-36 mx-auto mb-4 object-cover rounded-full" />
              <h3 className="text-xl font-semibold text-brand-dark mb-2">Vị Trí Trung Tâm</h3>
              <p className="text-brand-dark">
                Chỉ cách Hồ Hoàn Kiếm 5 phút đi bộ, dễ dàng khám phá Phố Cổ và các điểm tham quan nổi tiếng.
              </p>
            </div>
            <div className="bg-brand-light3 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <img src="design.jpg" alt="Design" className="w-36 h-36 mx-auto mb-4 object-cover rounded-full" />
              <h3 className="text-xl font-semibold text-brand-dark mb-2">Thiết Kế Độc Đáo</h3>
              <p className="text-brand-dark">
                Không gian kết hợp nét truyền thống Việt Nam với nội thất thủ công và tiện nghi hiện đại.
              </p>
            </div>
            <div className="bg-brand-light3 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <img src="experience.jpg" alt="Experience" className="w-36 h-36 mx-auto mb-4 object-cover rounded-full" />
              <h3 className="text-xl font-semibold text-brand-dark mb-2">Trải Nghiệm Địa Phương</h3>
              <p className="text-brand-dark">
                Tham gia tour xe đạp, lớp nấu phở, hoặc khám phá Hà Nội cùng hướng dẫn viên bản địa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-brand-cool2">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-light mb-12 animate-slide-up">
            Một Thoáng City House Homestay
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src=""
              alt="Standard"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
            />
            <img
              src=""
              alt="Advance"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
            />
            <img
              src=""
              alt="Premium"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
            />
            <img
              src=""
              alt="S-Premium"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-12 animate-slide-up">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-brand-light3 p-6 rounded-lg shadow-md">
              <p className="text-brand-dark italic mb-4">
                "City House Homestay là một trải nghiệm tuyệt vời! Không gian ấm cúng, nhân viên thân thiện, và vị trí quá hoàn hảo để khám phá Hà Nội."
              </p>
              <p className="text-brand-dark font-semibold">- Anna, du khách quốc tế</p>
            </div>
            <div className="bg-brand-light3 p-6 rounded-lg shadow-md">
              <p className="text-brand-dark italic mb-4">
                "Tôi yêu cách họ kết hợp văn hóa Việt Nam vào từng chi tiết. Tour xe đạp quanh Phố Cổ là điểm nhấn đáng nhớ!"
              </p>
              <p className="text-brand-dark font-semibold">- Minh, khách nội địa</p>
            </div>
            <div className="bg-brand-light3 p-6 rounded-lg shadow-md">
              <p className="text-brand-dark italic mb-4">
                "City House Homestay là một trải nghiệm tuyệt vời! Không gian ấm cúng, nhân viên thân thiện, và vị trí quá hoàn hảo để khám phá Hà Nội."
              </p>
              <p className="text-brand-dark font-semibold">- Anna, du khách quốc tế</p>
            </div>
            <div className="bg-brand-light3 p-6 rounded-lg shadow-md">
              <p className="text-brand-dark italic mb-4">
                "Tôi yêu cách họ kết hợp văn hóa Việt Nam vào từng chi tiết. Tour xe đạp quanh Phố Cổ là điểm nhấn đáng nhớ!"
              </p>
              <p className="text-brand-dark font-semibold">- Minh, khách nội địa</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-around gap-10">
          {/* Giới thiệu nhanh & Mạng xã hội */}
          <div className="w-60 space-y-4">
            <div className="flex items-center">
              <img className="w-10" src="image.png" alt="" />
              <h3 className="text-3xl font-semibold">CITYHOUSE</h3>
            </div>
            <p>Không gian trải nghiệm hẹn hò hàng đầu tại Hà Nội</p>
            <p>100+ Homestay tại Hà Nội</p>
            <div className="flex gap-4 mt-6">
              {/* <!-- Facebook Logo --> */}
              <a
                href="https://www.facebook.com/cityhouse.homestay"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              {/* <!-- Instagram Logo --> */}
              <a
                href="https://www.instagram.com/cityhouse.homestay/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.227-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* <!-- Threads Logo --> */}
              <a
                href="https://www.threads.com/@cityhouse.homestay"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.9141 8.12803C12.4185 6.11437 16.0241 7.18759 16.45 10.5C16.9018 14.014 16 16.8 12.5 16.8C9.24997 16.8 9.34997 14 9.34997 14C9.34997 11 14.5 10.6 17.5 12.1C23 15.6 19 22 13 22C8.02941 22 3.99997 19.5 3.99997 12C3.99997 4.5 8.02941 2 13 2C16.5079 2 19.6715 3.80695 20.8348 7.42085"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>

              {/* <!-- TikTok Logo --> */}
              <a
                href="https://www.tiktok.com/@cityhouse.homestay"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.55 2.89 2.89 0 0 1 .88.15v-3.81a6.7 6.7 0 0 0-1-.09 6.71 6.71 0 0 0-6.24 4.25 6.71 6.71 0 0 0 11.95 6.07V8.75a8.28 8.28 0 0 0 4.84 1.45V6.69h-.52z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a href='/' className="hover:text-white transition">Trang Chủ</a>
              </li>
              <li>
                <Link to={'/search-room'} className="hover:text-white transition">Tìm Phòng</Link>
              </li>
              <li>
                <Link to={'about'} className="hover:text-white transition">Giới Thiệu</Link>
              </li>
              <li>
                <Link className="hover:text-white transition">Chính Sách</Link>
              </li>
              <li>
                <Link className="hover:text-white transition">Liên Hệ</Link>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Liên Hệ</h3>
            <p>Địa chỉ: 28B Điện Biên Phủ, Hà Nội, Việt Nam</p>
            <p>
              Email:{" "}
              <a className="hover:text-white">Info@cityhousehomestay.vn</a>
            </p>
            <p>
              Hotline: <a className="hover:text-white">1900 3409</a>
            </p>
          </div>

          {/*Bản đồ */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Tìm Chúng Tôi</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.0128863239645!2d105.8406383695281!3d21.03062345056119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab97f1027c53%3A0xf6b9759c2459e91f!2zMjEgUC4gVHLhuqduIFBow7osIMSQaeG7h24gQmnDqm4sIEJhIMSQw6xuaCwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1754826179686!5m2!1svi!2s"
              width="100%"
              height="200"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2025 City House - Homestay Hà Nội. All rights reserved.</p>
          <p className="mt-2">
            <a className="hover:text-white transition">Chính Sách Bảo Mật</a> |{" "}
            <a className="hover:text-white transition">Điều Khoản Sử Dụng</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

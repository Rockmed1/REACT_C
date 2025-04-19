/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://mattovsplehupgolzfnn.supabase.co/storage/v1/object/public/cabin-images/**",
      ),
    ],
  },

  // output: "export", // to generate a static output to be deployed on cdn

  // this is to control the caching on the front end
  // experimental: {
  //   staleTimes: {
  //     dynamic: 0,
  //     static: 0,
  //   },
  // },
};

export default nextConfig;

/* 
"https://mattovsplehupgolzfnn.supabase.co/storage/v1/object/public/cabin-images/**", */

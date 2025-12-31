"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfileCard() {
  const { t } = useLanguage();
  const { profile } = t.about;

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl h-full flex flex-col justify-between relative overflow-hidden border border-slate-700"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Avatar Section */}
      <div className="bg-slate-700 rounded-3xl h-64 w-full mb-8 flex items-center justify-center relative overflow-hidden border border-slate-600">
        {/* Placeholder for avatar */}
        <User size={64} className="text-slate-500" />
        {/* <Image src="/avatar.jpg" alt="Avatar" layout="fill" objectFit="cover" /> */}
      </div>

      {/* Info Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white">
            {profile.name_label}: {profile.name_value}
          </h3>
          <p className="text-primary font-medium mt-1">
            {profile.role_label}: {profile.role_value}
          </p>
        </div>

        <div className="space-y-2 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20 text-slate-400">
              {profile.age_label}:
            </span>
            <span>{profile.age_value}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20 text-slate-400">
              {profile.education_label}:
            </span>
            <span>{profile.education_value}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20 text-slate-400">
              {profile.phone_label}:
            </span>
            <span>{profile.phone_value}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20 text-slate-400">
              {profile.wechat_label}:
            </span>
            <span>{profile.wechat_value}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20 text-slate-400">
              {profile.email_label}:
            </span>
            <span className="truncate">{profile.email_value}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

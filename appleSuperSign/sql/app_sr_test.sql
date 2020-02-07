/*
 Navicat Premium Data Transfer

 Source Server         : 吴 超签 测试
 Source Server Type    : MySQL
 Source Server Version : 50644
 Source Host           : 39.108.136.185:3306
 Source Schema         : app_sr_test

 Target Server Type    : MySQL
 Target Server Version : 50644
 File Encoding         : 65001

 Date: 09/01/2020 09:30:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sr_admin_info
-- ----------------------------
DROP TABLE IF EXISTS `sr_admin_info`;
CREATE TABLE `sr_admin_info`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_nick` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_apk_info
-- ----------------------------
DROP TABLE IF EXISTS `sr_apk_info`;
CREATE TABLE `sr_apk_info`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `app_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应用名称',
  `bundle_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应用标识id',
  `statu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '1:可用  0:不可用',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `icon_base64` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'icon',
  `ipa_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '包路径',
  `app_version` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '最小系统版本',
  `max_udid` int(11) NULL DEFAULT NULL COMMENT '最大可用设备数',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `type` int(1) NULL DEFAULT NULL COMMENT '1:企业包  2：超签包',
  `tip` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备注',
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '更新时间',
  `admin_check` int(1) NOT NULL DEFAULT 1 COMMENT '超管锁定 1：可用 0 不可用',
  `ex_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '过期时间',
  `is_delect` int(11) NOT NULL DEFAULT 0 COMMENT '0：可用  1：不可用',
  `Hashids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '唯一id',
  `introduce` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '应用介绍',
  `introduce_image` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '应用介绍图片',
  `related` int(10) NOT NULL DEFAULT 0 COMMENT '关联的应用id',
  `d_count` int(255) NOT NULL DEFAULT 0 COMMENT '下载次数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 240 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_apk_tmp
-- ----------------------------
DROP TABLE IF EXISTS `sr_apk_tmp`;
CREATE TABLE `sr_apk_tmp`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `app_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应用名称',
  `bundle_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应用标识id',
  `statu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '1:可用  0:不可用',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `icon_base64` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'icon',
  `ipa_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '包路径',
  `app_version` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '最小系统版本',
  `max_udid` int(11) NULL DEFAULT NULL COMMENT '最大可用设备数',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `type` int(1) NULL DEFAULT NULL COMMENT '1:企业包  2：超签包',
  `tip` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备注',
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '更新时间',
  `admin_check` int(1) NOT NULL DEFAULT 1 COMMENT '超管锁定 1：可用 0 不可用',
  `ex_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '过期时间',
  `is_delect` int(11) NOT NULL DEFAULT 0 COMMENT '0：可用  1：不可用',
  `Hashids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '唯一id',
  `introduce` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '应用介绍',
  `introduce_image` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '应用介绍图片',
  `related` int(10) NULL DEFAULT NULL COMMENT '关联的应用id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 300 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_apple_id_info
-- ----------------------------
DROP TABLE IF EXISTS `sr_apple_id_info`;
CREATE TABLE `sr_apple_id_info`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `apple_account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `apple_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_num` int(11) NULL DEFAULT NULL,
  `statu` int(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1:正常 0:冻结',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bundle_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `owner_id` int(11) NULL DEFAULT NULL,
  `error_statu` int(11) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1:正常 0:出错',
  `error_msg` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '错误信息',
  `is_delect` int(1) NOT NULL DEFAULT 0 COMMENT '0：可用  1：不可用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_business_signature
-- ----------------------------
DROP TABLE IF EXISTS `sr_business_signature`;
CREATE TABLE `sr_business_signature`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '标识名称',
  `tip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `statu` int(1) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '证书状态 0:可用 1：禁用',
  `creater_time` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `p12_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'p12文件路径\\r\\n',
  `mobileprovision_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述文件路径',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'p12文件密码',
  `is_delect` int(1) NOT NULL DEFAULT 0 COMMENT ' 0:可用 1：禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_captcha_info
-- ----------------------------
DROP TABLE IF EXISTS `sr_captcha_info`;
CREATE TABLE `sr_captcha_info`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `captcha` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 91 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_consume_record
-- ----------------------------
DROP TABLE IF EXISTS `sr_consume_record`;
CREATE TABLE `sr_consume_record`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `amount` int(11) NULL DEFAULT NULL COMMENT '消费金额',
  `amount_early` int(11) NULL DEFAULT NULL COMMENT '消费前金额快照',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `type` int(11) NULL DEFAULT NULL COMMENT '消费类型:0:购买udid 1:续费APP 2:更新APP',
  `app_id` int(11) NULL DEFAULT NULL COMMENT '操作对于的appId 可为空',
  `ip_addr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作IP',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 185 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_download_record
-- ----------------------------
DROP TABLE IF EXISTS `sr_download_record`;
CREATE TABLE `sr_download_record`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `udid_id` int(11) NULL DEFAULT NULL,
  `ipa_id` int(11) NULL DEFAULT NULL,
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `download_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `channel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '主渠道',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10154 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_ipa_info
-- ----------------------------
DROP TABLE IF EXISTS `sr_ipa_info`;
CREATE TABLE `sr_ipa_info`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `app_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应用名称',
  `bundle_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应用标识id',
  `statu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '1:可用  0:不可用',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `icon_base64` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'icon',
  `ipa_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '包路径',
  `minimun_OS` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '最小系统版本',
  `max_udid` int(11) NULL DEFAULT NULL COMMENT '最大可用设备数',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `type` int(1) NULL DEFAULT NULL COMMENT '1:企业包  2：超签包',
  `tip` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备注',
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '更新时间',
  `admin_check` int(1) NOT NULL DEFAULT 1 COMMENT '超管锁定 1：可用 0 不可用',
  `ex_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '过期时间',
  `is_delect` int(11) NOT NULL DEFAULT 0 COMMENT '0：可用  1：不可用',
  `Hashids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '唯一id',
  `cer_id` int(10) NOT NULL COMMENT '对应企业签名证书id',
  `introduce` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '应用介绍',
  `introduce_image` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '应用介绍图片',
  `related` int(255) NOT NULL DEFAULT 0 COMMENT '关联应用id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 503 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_ipa_tmp
-- ----------------------------
DROP TABLE IF EXISTS `sr_ipa_tmp`;
CREATE TABLE `sr_ipa_tmp`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `app_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bundle_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `statu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '1:可用  0:不可用',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `icon_base64` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `ipa_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `minimun_OS` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `max_udid` int(11) NULL DEFAULT NULL,
  `type` int(1) NOT NULL COMMENT '1:企业包  2：超签包',
  `tip` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备注',
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新时间',
  `ex_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '过期时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 798 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_recharge_record
-- ----------------------------
DROP TABLE IF EXISTS `sr_recharge_record`;
CREATE TABLE `sr_recharge_record`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL COMMENT '0:减少 1:增加',
  `ip_addr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作ip',
  `amount` int(11) NULL DEFAULT NULL COMMENT '操作金额',
  `amount_early` int(11) NULL DEFAULT NULL COMMENT '操作前余额快照',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_sys_config_info
-- ----------------------------
DROP TABLE IF EXISTS `sr_sys_config_info`;
CREATE TABLE `sr_sys_config_info`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `coin_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '币名',
  `coin_to_udid` int(11) NOT NULL COMMENT '购买udid单价',
  `coin_to_resign` int(11) NOT NULL COMMENT '企业签名单价',
  `coin_to_update` int(11) NOT NULL COMMENT '更新企业包单价',
  `kf_qq_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客服QQ',
  `kf_weixin_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客服微信',
  `kf_phone_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客服电话',
  `coin_to_dcount` int(11) NOT NULL COMMENT '下载次数单价',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_udid_info
-- ----------------------------
DROP TABLE IF EXISTS `sr_udid_info`;
CREATE TABLE `sr_udid_info`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `udid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_product` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_imei` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_version` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `apple_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '关联的appleId',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `statu` int(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1:可用  0:不可用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4588 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sr_user_info
-- ----------------------------
DROP TABLE IF EXISTS `sr_user_info`;
CREATE TABLE `sr_user_info`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `account` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `coin` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `udid_count` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '可用udid数',
  `statu` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0:可用 1：禁用',
  `creater_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `is_delect` int(11) NOT NULL DEFAULT 0 COMMENT '0：可用  1：不可用',
  `d_count` int(255) NOT NULL DEFAULT 100 COMMENT '可用下载点数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 121 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;

var mysql = require('mysql');
var config = require('../config/config.js')
const Hashids = require('hashids/cjs')
const hashids = new Hashids()

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});


class Mysql {
    constructor() {

    }
    //超管登录
    get_admin_info(account) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from sr_admin_info WHERE  account= ?', [account], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    };



    //更新udid信息
    update_udid_info(udid, device_product, device_imei, device_version, creater_time) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_udid_info(udid, device_product,device_imei,device_version,creater_time) SELECT ?,?,?,?,? FROM DUAL WHERE NOT EXISTS(SELECT * FROM sr_udid_info WHERE udid = ?)', [udid, device_product, device_imei, device_version, creater_time, udid], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    //获得app信息
    get_app_info(id) {
        return new Promise((resolve, reject) => {

            pool.query('SELECT * FROM sr_ipa_info WHERE id = ? And is_delect = 0', [id.toString()], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_apk_info(id) {
        return new Promise((resolve, reject) => {

            pool.query('SELECT * FROM sr_apk_info WHERE id = ? And is_delect = 0', [id.toString()], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_apk_info_releated(id) {
        return new Promise((resolve, reject) => {

            pool.query('SELECT * FROM sr_apk_info WHERE related = ? And is_delect = 0', [id.toString()], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询企业证书下的app
    get_app_info_bs_id(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_ipa_info WHERE cer_id = ?', [id.toString()], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }


    get_app_info_size() {
        return new Promise((resolve, reject) => {
            pool.query('select count(*) as size from sr_ipa_info where is_delect = 0', function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    //更新app状态
    update_app_statu(id, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET statu = ? WHERE id = ?', [statu, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_apk_statu(id, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info SET statu = ? WHERE id = ?', [statu, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_apk_releated(id, releatedId) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info SET related = ? WHERE id = ?', [releatedId, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //保存提交的APP
    update_app_Info_sr(appid, userid, tip) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET tip = ?, user_id = ? WHERE id = ?', [tip, userid, appid], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //更新app备注
    update_app_tip(id, tip) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET tip = ? WHERE id = ?', [tip, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }
    update_apk_tip(id, tip) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info SET tip = ? WHERE id = ?', [tip, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_apk_dcount(id, count) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info SET d_count = ? WHERE id = ?', [count, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_user_dcount(id, count) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_user_info SET d_count = ? WHERE id = ?', [count, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }
    //更新app短链
    update_app_Hashids(id, Hashids) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET Hashids = ? WHERE id = ?', [Hashids, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_apk_Hashids(id, Hashids) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info SET Hashids = ? WHERE id = ?', [Hashids, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //更新app介绍信息
    update_apk_Introduce(id, introduce, introduce_image) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info SET introduce = ?,introduce_image = ? WHERE id = ?', [introduce, introduce_image, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_ipa_Introduce(id, introduce, introduce_image) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET introduce = ?,introduce_image = ? WHERE id = ?', [introduce, introduce_image, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }
    //更新app最大可用udid
    update_app_max_udid(id, udid) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET max_udid = ? WHERE id = ?', [udid, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }



    //查询UDID已满应用数
    get_Expired_app_size() {
        return new Promise((resolve, reject) => {

            pool.query('select count(*) as size from sr_ipa_info where max_udid <= (select count(*) from (select distinct(udid_id),ipa_id from sr_download_record )as temp2\n' +
                'where sr_ipa_info.id = temp2.ipa_id) ', function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询app信息已经以及可用次数
    get_app_udid_info(appId) {
        return new Promise((resolve, reject) => {

            pool.query('SELECT *,(select count(*) from (select distinct(udid_id),ipa_id from sr_download_record )as temp2 where ? = temp2.ipa_id) as udid_inuse FROM sr_ipa_info WHERE id = ?', [appId, appId], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //判断UDID是否在某账号下
    get_udid_in_app(appId, udid) {
        return new Promise((resolve, reject) => {

            pool.query('SELECT * FROM sr_download_record WHERE ipa_id = ? AND (SELECT id FROM sr_udid_info WHERE udid = ?) = udid_id', [appId, udid], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }


    //获得账号列表
    get_appid_info_list(account, begin_time, end_time, pageSize, pageNum) {
        return new Promise((resolve, reject) => {

            var sql = 'select *  from sr_apple_id_info where is_delect = 0 and (apple_account like "%' + account + '%" or "' + account + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    get_appid_info_size(account, begin_time, end_time) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_apple_id_info where is_delect = 0 And (apple_account like "%' + account + '%" or "' + account + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "")';

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }


    //获得udid列
    get_udid_info_list(pageSize, pageNum) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_udid_info ORDER BY id desc limit ?,?', [(pageNum - 1) * pageSize, pageSize], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询用户使用的UDID
    get_user_udid_list(id) {
        return new Promise((resolve, reject) => {
            pool.query('select udid_id from (select id from sr_ipa_info where user_id =?) as tmp,sr_download_record where tmp.id = sr_download_record.ipa_id group by udid_id', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询应用的关联应用
    get_app_related(id) {
        return new Promise((resolve, reject) => {
            pool.query('select * from sr_ipa_info where id=?', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_user_download_list(id) {
        return new Promise((resolve, reject) => {
            pool.query('select count(*) as size from (select id from sr_ipa_info where user_id =?) as tmp,sr_download_record where tmp.id = sr_download_record.ipa_id  and  date_format(from_unixtime(sr_download_record.creater_time/1000),"%Y-%m-%d") = date_format(now(),"%Y-%m-%d")', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //获得剩余UDID数量
    get_Surplus_size() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT sum(device_num) as size FROM sr_apple_id_info', function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    get_udid_info_size() {
        return new Promise((resolve, reject) => {
            pool.query('select count(*) as size from sr_udid_info', function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    check_udid_info(udid) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_udid_info where udid = ?', [udid], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_appleid_info(apple_id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_apple_id_info where apple_account = ? and statu != "0" and error_statu != "0"  And is_delect = 0', [apple_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    select_appleid_inUse() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_apple_id_info where device_num > 2 and statu != "0" and error_statu != "0"  And is_delect = 0 ', function (error, results, fields) {
                if (error) {
                    console.log("device" + error);

                    throw error
                };
                debugger;
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_udid_account(appleId, udid) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_udid_info SET apple_id = ? WHERE udid = ?', [appleId, udid], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //插入ipa包到临时表
    insert_ipa_info_tmp(apple_name, bundle_id, minimun_OS, statu, creater_time, icon_Base64, ipa_path) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_ipa_tmp ( app_name, bundle_id,minimun_OS,max_udid,statu,creater_time,icon_base64,ipa_path,type,update_time) VALUES ( ?,?,?,?,?,?,?,?,?,?)', [apple_name, bundle_id, minimun_OS, config.default_max_udid, statu, creater_time, icon_Base64, ipa_path, "2", creater_time], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    insert_apk_info_tmp(apple_name, bundle_id, app_version, statu, creater_time, icon_Base64, ipa_path) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_apk_tmp ( app_name, bundle_id,app_version,statu,creater_time,icon_base64,ipa_path,update_time) VALUES ( ?,?,?,?,?,?,?,?)', [apple_name, bundle_id, app_version, statu, creater_time, icon_Base64, ipa_path, creater_time], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //从临时表查询app信息
    get_ipa_info_tmp(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_ipa_tmp where id = ?', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_apk_info_tmp(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_apk_tmp where id = ?', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //插入ipa信息
    insert_ipa_info_superResign(apple_name, bundle_id, minimun_OS, statu, creater_time, icon_Base64, ipa_path, tip, user_id) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_ipa_info ( app_name, bundle_id,minimun_OS,max_udid,statu,creater_time,icon_base64,ipa_path,type,update_time,tip,user_id) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?)', [apple_name, bundle_id, minimun_OS, config.default_max_udid, statu, creater_time, icon_Base64, ipa_path, "2", creater_time, tip, user_id], function (error, results, fields) {
                if (error) {
                    throw error
                };

                //更新短链
                var hashID = hashids.encode(10001 + parseInt(results.insertId));

                pool.query('UPDATE sr_ipa_info SET Hashids = ? WHERE id = ?', [hashID, results.insertId], function (error, results, fields) {
                    if (error) {
                        throw error
                    };
                    resolve(results)
                });

                resolve(results)
            });
        })
    }

    insert_apk_info(apple_name, bundle_id, appversion, statu, creater_time, icon_Base64, ipa_path, tip, user_id) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_apk_info ( app_name, bundle_id,app_version,statu,creater_time,icon_base64,ipa_path,update_time,tip,user_id) VALUES ( ?,?,?,?,?,?,?,?,?,?)', [apple_name, bundle_id, appversion, statu, creater_time, icon_Base64, ipa_path, creater_time, tip, user_id], function (error, results, fields) {
                if (error) {
                    throw error
                };

                //更新短链
                var hashID = hashids.encode(10001 + parseInt(results.insertId));

                pool.query('UPDATE sr_apk_info SET Hashids = ? WHERE id = ?', [hashID, results.insertId], function (error, results, fields) {
                    if (error) {
                        throw error
                    };
                    resolve(results)
                });

                resolve(results)
            });
        })
    }
    //更新短链

    //更新ipa信息
    update_ipa_info_superResign(apple_name, minimun_OS, update_time, icon_Base64, ipa_path, tip, app_id) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET app_name = ?,minimun_OS = ?,update_time = ?,icon_base64 = ?,ipa_path = ?,tip = ?  WHERE id = ?', [apple_name, minimun_OS, update_time, icon_Base64, ipa_path, tip, app_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    update_apk_info(apple_name, app_version, update_time, icon_Base64, ipa_path, tip, app_id) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info SET app_name = ?,app_version = ?,update_time = ?,icon_base64 = ?,ipa_path = ?,tip = ?  WHERE id = ?', [apple_name, app_version, update_time, icon_Base64, ipa_path, tip, app_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    //插入和更新企业包信息
    insert_ipa_info_bs(apple_name, bundle_id, minimun_OS, statu, creater_time, icon_Base64, ipa_path, tip, user_id, cer_id) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_ipa_info ( app_name, bundle_id,minimun_OS,ex_time,statu,creater_time,icon_base64,ipa_path,type,update_time,tip,user_id,cer_id) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?)', [apple_name, bundle_id, minimun_OS, creater_time, statu, creater_time, icon_Base64, ipa_path, "1", creater_time, tip, user_id, cer_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    //更新企业包信息
    update_ipa_info_bs(apple_name, minimun_OS, update_time, icon_Base64, ipa_path, tip, app_id, cer_id) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET app_name = ?,minimun_OS = ?,update_time = ?,icon_base64 = ?,ipa_path = ?,tip = ?,cer_id=?  WHERE id = ?', [apple_name, minimun_OS, update_time, icon_Base64, ipa_path, tip, cer_id, app_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    //更新企业包使用的账号
    update_ipa_info_bs_account(app_id, ipa_path, cer_id) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET cer_id=?,ipa_path=?  WHERE id = ?', [cer_id, ipa_path, app_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }



    //企业包续费
    update_ipa_exTime_bs(app_id, update_time, ex_time) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET update_time = ?,ex_time = ?  WHERE id = ?', [update_time, ex_time, app_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    insert_appleid_info(apple_account, apple_password, device_num, creater_time, tip, bundle_id) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_apple_id_info ( apple_account, apple_password,device_num,creater_time,tip,bundle_id) VALUES ( ?,?,?,?,?,?)', [apple_account, apple_password, device_num, creater_time, tip, bundle_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    check_appleid_info(apple_account) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_apple_id_info where apple_account = ? and is_delect = 0', [apple_account], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_device_num(apple_account, deviceNum) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apple_id_info SET device_num = ? WHERE apple_account = ?', [deviceNum, apple_account], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //插入下载记录
    insert_download_record(app_id, udid,channel) {
        return new Promise((resolve, reject) => {
            var time = (new Date()).getTime();

            pool.query('INSERT INTO sr_download_record ( udid_id, ipa_id, creater_time,channel) VALUES ( (select id from sr_udid_info where ? = udid),?,?,?)', [udid, app_id, time,channel], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询渠道列表
    get_download_record_channel_list(ipa_id) {
        return new Promise((resolve, reject) => {

            pool.query('SELECT distinct channel FROM sr_download_record  WHERE ipa_id = ?' ,[ipa_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询下载记录
    get_download_record(channel,ipa_id, pageNum, pageSize) {
        return new Promise((resolve, reject) => {

            pool.query('select *,(select udid from sr_udid_info  where udid_id = sr_udid_info.id) as udid_name from sr_download_record where ipa_id = ? and channel=? ORDER BY id desc limit ?,?', [ipa_id,channel, (pageNum - 1) * pageSize, pageSize], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_download_record_size(channel,ipa_id) {
        return new Promise((resolve, reject) => {

            pool.query('select count(*) as size from sr_download_record where ipa_id = ? and channel =?', [ipa_id,channel], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询下载数量
    get_download_size_today() {
        return new Promise((resolve, reject) => {
            var time = (new Date()).getTime();

            pool.query("select count(*) as size  from sr_download_record Where date_format(from_unixtime(creater_time/1000),'%Y-%m-%d') = date_format(now(),'%Y-%m-%d')", function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询用户信息列表
    get_user_Info_List(user_name, begin_time, end_time, pageSize, pageNum) {
        return new Promise((resolve, reject) => {
            var sql = 'select *  from sr_user_info where  is_delect = 0 And (account like "%' + user_name + '%" or "' + user_name + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询用户信息
    get_user_Info(user_id) {
        return new Promise((resolve, reject) => {

            pool.query('select account,d_count,coin,phone,statu,is_delect,udid_count,creater_time from sr_user_info where id =?', [user_id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }



    //查询用户信息列表条数
    get_user_Info_List_size(user_name, begin_time, end_time) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_user_info where is_delect = 0 And (account like "%' + user_name + '%" or "' + user_name + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "")';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //更新用户状态
    update_user_statu(id, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_user_info SET statu = ? WHERE id = ?', [statu, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //修改用户udid
    update_user_udid_num(id, udid) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_user_info SET udid_count = ? WHERE id = ?', [udid, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }
    //修改用户余额
    update_user_amount(id, amount) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_user_info SET coin = ? WHERE id = ?', [amount, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //更新用户数据
    update_user_amount_udid(id, udid, amount) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_user_info SET coin = ?,udid_count = ? WHERE id = ?', [amount, udid, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_user_amount_dcount(id, dcount, amount) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_user_info SET coin = ?,d_count = ? WHERE id = ?', [amount, dcount, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //添加余额修改记录
    insert_amount_record(userId, type, ipaddr, amount, amountEarly) {
        return new Promise((resolve, reject) => {
            var time = (new Date()).getTime();

            pool.query('INSERT INTO sr_recharge_record ( user_id, type, ip_addr,amount,amount_early,creater_time) VALUES (?,?,?,?,?,?)', [userId, type, ipaddr, amount, amountEarly, time], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_user_coin(userId) {
        return new Promise((resolve, reject) => {

            pool.query('select coin from sr_user_info  WHERE id = ?', [userId], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //获得操作记录
    get_recharge_record_size(user_name, begin_time, end_time) {
        return new Promise((resolve, reject) => {

            var sql = 'select count(*) as size  from sr_recharge_record where ((select account from sr_user_info where sr_user_info.id = sr_recharge_record.user_id) like "%' + user_name + '%" or "' + user_name + '" = "")  ' +
                'and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "")';

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }
    get_recharge_record(user_name, begin_time, end_time, pageSize, pageNum) {
        return new Promise((resolve, reject) => {

            var sql = 'select *,(select account from sr_user_info where sr_user_info.id = sr_recharge_record.user_id) as account from sr_recharge_record ' +
                'where ((select account from sr_user_info where sr_user_info.id = sr_recharge_record.user_id) like "%' + user_name + '%" or "' + user_name + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';


            pool.query(sql, function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //获得app信息列表 ->需要权限 超级签名
    get_app_info_list_admin(user_name, begin_time, end_time, pageSize, pageNum, app_name) {
        return new Promise((resolve, reject) => {
            var sql = 'select *,(select account from sr_user_info where sr_user_info.id = sr_ipa_info.user_id) as account from sr_ipa_info ' +
                'where is_delect = 0 And ((select account from sr_user_info where sr_user_info.id = sr_ipa_info.user_id) like "%' + user_name + '%" or "' + user_name + '" = "")' +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "") and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") and type = 2 ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }



    get_app_info_list_size_admin(user_name, begin_time, end_time, app_name) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_ipa_info where is_delect = 0 And ((select account from sr_user_info where sr_user_info.id = sr_ipa_info.user_id) like "%' + user_name + '%" or "' + user_name + '" = "")  ' +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") and type = 2';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }
    get_apk_info_list_admin(user_name, begin_time, end_time, pageSize, pageNum, app_name) {
        return new Promise((resolve, reject) => {
            var sql = 'select *,(select account from sr_user_info where sr_user_info.id = sr_apk_info.user_id) as account from sr_apk_info ' +
                'where is_delect = 0 And ((select account from sr_user_info where sr_user_info.id = sr_apk_info.user_id) like "%' + user_name + '%" or "' + user_name + '" = "")' +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "") and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "")  ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_apk_info_list_size_admin(user_name, begin_time, end_time, app_name) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_apk_info where is_delect = 0 And ((select account from sr_user_info where sr_user_info.id = sr_apk_info.user_id) like "%' + user_name + '%" or "' + user_name + '" = "")  ' +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "")';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //获得app信息列表 ->需要权限
    get_app_info_list(pageSize, pageNum) {
        return new Promise((resolve, reject) => {
            pool.query('select  * ,' +
                '(select count(*) from (select distinct(udid_id),ipa_id from sr_download_record )as temp2 ' +
                'where sr_ipa_info.id = temp2.ipa_id) as udid_inuse,' +
                '(select count(*) from sr_download_record where sr_ipa_info.id = sr_download_record.ipa_id) as size ' +
                'from sr_ipa_info  ORDER BY id desc limit ?,?', [(pageNum - 1) * pageSize, pageSize], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    get_apk_info_list_user(user_id, begin_time, end_time, pageSize, pageNum, app_name) {
        return new Promise((resolve, reject) => {
            var sql = 'select * from sr_apk_info ' +
                'where is_delect = 0 And user_id = ' + user_id +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "") and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_app_info_list_user(user_id, begin_time, end_time, pageSize, pageNum, app_name, type) {
        return new Promise((resolve, reject) => {
            var sql = 'select *,(select count(*) from (select distinct(udid_id),ipa_id from sr_download_record )as temp2 where  sr_ipa_info.id = temp2.ipa_id) as udid_inuse from sr_ipa_info ' +
                'where is_delect = 0 And user_id = ' + user_id +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "") and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") and type = ' + type + ' ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_app_info_list_size_user(user_id, begin_time, end_time, app_name, type) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_ipa_info where  is_delect = 0 And user_id =' + user_id +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") and (type = "' + type + '" or "' + type + '" = "")';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_related_app_info_list_user(user_id, pageSize, pageNum) {
        return new Promise((resolve, reject) => {
            var sql = 'select * from sr_ipa_info ' +
                'where is_delect = 0 And user_id = ' + user_id +
                ' and type = 2 ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_related_app_info_list_size_user(user_id) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_ipa_info where  is_delect = 0 And user_id =' + user_id +
                '   and type = 2 and related = 0';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_apk_info_list_size_user(user_id, begin_time, end_time, app_name, type) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_apk_info where  is_delect = 0 And user_id =' + user_id +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //获得企业签名应用列表
    get_bus_app_info_list_admin(user_name, begin_time, end_time, pageSize, pageNum, app_name) {
        return new Promise((resolve, reject) => {
            var sql = 'select *,(select account from sr_user_info where sr_user_info.id = sr_ipa_info.user_id) as account from sr_ipa_info ' +
                'where is_delect = 0 And ((select account from sr_user_info where sr_user_info.id = sr_ipa_info.user_id) like "%' + user_name + '%" or "' + user_name + '" = "")' +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "") and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") and type = 1 ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    get_bus_app_info_list_size_admin(user_name, begin_time, end_time, app_name) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_ipa_info where is_delect = 0 And ((select account from sr_user_info where sr_user_info.id = sr_ipa_info.user_id) like "%' + user_name + '%" or "' + user_name + '" = "")  ' +
                ' and (app_name like "%' + app_name + '%" or "' + app_name + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") and type = 1';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    //更新企业应用过期时间
    update_bus_app_expired_time(id, time) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET ex_time = ? WHERE id = ?', [time, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }
    //更新应用状态 - 超管
    update_app_statu_admin(id, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info SET admin_check = ? WHERE id = ?', [statu, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //更新应用状态 - 超管
    update_apk_statu_admin(id, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info SET admin_check = ? WHERE id = ?', [statu, id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }
    //获得UDID信息 - 超管
    get_udid_info_list_admin(udid, begin_time, end_time, pageSize, pageNum, apple_id) {
        return new Promise((resolve, reject) => {
            var sql = 'select * from sr_udid_info ' +
                'where (udid like "%' + udid + '%" or "' + udid + '" = "")' +
                ' and (apple_id like "%' + apple_id + '%" or "' + apple_id + '" = "") and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    get_udid_info_list_size_admin(udid, begin_time, end_time, apple_id) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_udid_info where (udid like "%' + udid + '%" or "' + udid + '" = "")  ' +
                ' and (apple_id like "%' + apple_id + '%" or "' + apple_id + '" = "")  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ';


            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })

    }

    //更新udid状态
    update_udid_statu(id, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_udid_info SET statu = ? WHERE id = ?', [statu, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //更新appleID状态
    update_appleId_statu(id, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apple_id_info SET statu = ? WHERE id = ?', [statu, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //更新appleID错误状态
    update_appleId_error_statu(id) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apple_id_info SET error_statu = 1 , error_msg = "" WHERE id = ?', [id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //获得企业账号信息
    get_bus_account_info_list(account, begin_time, end_time, pageSize, pageNum) {
        return new Promise((resolve, reject) => {
            var sql = 'select *,(SELECT count(*) FROM sr_ipa_info WHERE sr_ipa_info.cer_id = sr_business_signature.id and is_delect =0) as size  from sr_business_signature ' +
                'where is_delect = 0 And (tag_name like "%' + account + '%" or "' + account + '" = "")' +
                ' and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });

        })
    }

    //读取可用的企业账号信息
    get_bus_account_info_usable() {
        return new Promise((resolve, reject) => {
            pool.query('select * from sr_business_signature where  is_delect = 0 And statu = 0', function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_bus_account_app_list(cerid) {
        return new Promise((resolve, reject) => {
            pool.query('select * from sr_ipa_info where  cer_id = ? and is_delect =0', [cerid], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //读取企业账号信息
    get_bus_account_info(id) {
        return new Promise((resolve, reject) => {
            pool.query('select * from sr_business_signature where  id = ?', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });

        })
    }

    get_bus_account_info_list_size(account, begin_time, end_time) {
        return new Promise((resolve, reject) => {
            var sql = 'select count(*) as size  from sr_business_signature where  is_delect = 0 And (tag_name like "%' + account + '%" or "' + account + '" = "")  ' +
                '  and (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ';

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_bus_account_statu(id, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_business_signature SET statu = ? WHERE id = ?', [statu, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    update_bus_account_tip(id, tip) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_business_signature SET tip = ? WHERE id = ?', [tip, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    insert_bus_account(tag_name, tip, statu, createrTime, p12Path, mpPath, password) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_business_signature (tag_name,tip,statu,creater_time,p12_path,mobileprovision_path,password) VALUES ( ?,?,?,?,?,?,?)', [tag_name, tip, statu, createrTime, p12Path, mpPath, password], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_sys_config_info() {
        return new Promise((resolve, reject) => {
            var sql = 'select * from sr_sys_config_info';
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    update_sys_coin_config_info(coin_name, coin_to_udid, coin_to_resign, coin_to_update, coin_to_dcount) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_sys_config_info SET coin_name = ?,coin_to_udid = ?,coin_to_resign = ?,coin_to_update = ?,coin_to_dcount = ? WHERE id = 1', [coin_name, coin_to_udid, coin_to_resign, coin_to_update, coin_to_dcount], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    update_sys_us_config_info(kf_qq_info, kf_weixin_info, kf_phone_info) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_sys_config_info SET kf_qq_info = ?,kf_weixin_info = ?,kf_phone_info = ?  WHERE id = 1', [kf_qq_info, kf_weixin_info, kf_phone_info], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    get_user_info_phone(phone) {
        return new Promise((resolve, reject) => {
            pool.query('select * from sr_user_info where phone = ?', [phone], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    get_user_captch_new(phone) {
        return new Promise((resolve, reject) => {
            pool.query('    select * from ( select * from sr_captcha_info where  phone = ? order by creater_time Desc) a group by a.phone', [phone], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    insert_user_captch(phone, captch, time) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_captcha_info (phone,captcha,creater_time) VALUES ( ?,?,?)', [phone, captch, time], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    insert_user_info(account, password, creater_time) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO sr_user_info (account,password,creater_time) VALUES ( ?,?,?)', [account, password, creater_time], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    get_user_info_account(account) {
        return new Promise((resolve, reject) => {
            pool.query('select * from sr_user_info where account = ?', [account], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    update_user_password(account, password) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_user_info SET password = ? WHERE account = ?', [password, account], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    check_user_app(user_id, id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_ipa_info WHERE id = ? and user_id = ?', [id, user_id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    check_user_apk(user_id, id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_apk_info WHERE id = ? and user_id = ?', [id, user_id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    //检查短连接是否已经存在
    check_app_shortLink(Hashids) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_ipa_info WHERE Hashids = ?', [Hashids], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }

    check_apk_shortLink(Hashids) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM sr_apk_info WHERE Hashids = ?', [Hashids], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
            });
        })
    }


    //添加消费记录
    insert_consume_record(userId, amount, amount_early, creater_time, type, app_id, ip_addr) {
        return new Promise((resolve, reject) => {

            pool.query('INSERT INTO sr_consume_record (user_id,amount,amount_early,creater_time,type,app_id,ip_addr) VALUES (?,?,?,?,?,?,?)', [userId, amount, amount_early, creater_time, type, app_id, ip_addr], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //查询消费记录
    get_consume_record(userId, begin_time, end_time, pageNum, pageSize) {
        return new Promise((resolve, reject) => {

            var sql = 'select * from sr_consume_record ' +
                'where user_id =' + userId + ' and' +
                '  (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "") ORDER BY id desc limit ' + (pageNum - 1) * pageSize + ' , ' + pageSize + '';

            pool.query(sql, function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    get_consume_record_size(userId, begin_time, end_time) {
        return new Promise((resolve, reject) => {

            var sql = 'select count(*) as size from sr_consume_record ' +
                'where user_id =' + userId + ' and' +
                '  (creater_time > "' + begin_time + '" or "' + begin_time + '" = "") and (creater_time < "' + end_time + '" or "' + end_time + '" = "")';

            pool.query(sql, function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //删除操作
    //删除用户
    del_user_info(userid) {
        return new Promise((resolve, reject) => {

            pool.query("UPDATE sr_user_info SET is_delect = 1 WHERE id = ?", [userid], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //删除app
    del_app_info(id) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_ipa_info  SET is_delect = 1 WHERE id = ?', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    del_apk_info(id) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apk_info  SET is_delect = 1 WHERE id = ?', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //删除appid
    del_appId_info(id) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apple_id_info  SET is_delect = 1 WHERE id = ?', [id], function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        })
    }

    //获得待检查账号列表
    get_incheck_appid_info_list() {
        return new Promise((resolve, reject) => {

            var sql = 'select *  from sr_apple_id_info where is_delect = 0 and statu = 1';

            pool.query(sql, function (error, results, fields) {
                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        });
    };

    //更新appleID证书状态
    update_appleId_statu_cert(id, msg, statu) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE sr_apple_id_info SET statu = ? , error_msg = ? WHERE id = ?', [statu, msg, id], function (error, results, fields) {

                if (error) {
                    throw error
                };
                resolve(results)
                // console.log('The solution is: ', results[0].solution);
            });
        });
    };
}

module.exports = new Mysql()
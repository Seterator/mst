import React from 'react';

import '../../../style/_label.scss'
import '../../../style/staff.scss'

export function ProfileEdit(){
    return(
        <section className="section section-content">
            <div className="container">
                <div className="nav-content president">
                    <h2 className="nav-content-title">Изменение данных</h2>
                    <div className="twoCol">
                        <div className="about">
                            <img height="352px" width="282px" src="https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200" alt=""/>
                            <h3 className="name">Лиса Лисичка</h3>
                        </div>
                        <div className="content" style={{display:'grid'}}>
                            <input placeholder="Электронная почта"/>
                            <input placeholder="Телефон"/>
                            <input placeholder="Город"/>
                            <textarea placeholder="О себе"/>
                            <button>Запросить модерацию</button>
                            <h3>Изменить пароль</h3>
                            <input placeholder="Старый пароль"/>
                            <hr/>
                            <input placeholder="Новый пароль"/>
                            <input placeholder="Подтверждение"/>
                        </div>
                        <div className="content">
                            <div>В рамках спецификации современных стандартов, действия представителей оппозиции являются только методом политического участия и представлены в исключительно положительном свете. Безусловно, постоянный количественный рост и сфера нашей активности в значительной степени обусловливает важность позиций, занимаемых участниками в отношении поставленных задач. Не следует, однако, забывать, что сплочённость команды профессионалов влечет за собой процесс внедрения и модернизации вывода текущих активов.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}